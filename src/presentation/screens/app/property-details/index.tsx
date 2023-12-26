import { createComponents, useToken } from "@gluestack-style/react";
import { useToast } from "@gluestack-ui/themed";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TouchableOpacity as RNTouchableOpacity } from "react-native";
import type { HttpGetClient } from "src/data/contracts/infra";
import type { Property, UserData } from "src/domain/models";
import BookmarkIcon from "src/main/assets/colorfull-icons/bookmark.svg";
import BookmarkFilledIcon from "src/main/assets/colorfull-icons/bookmark-filled.svg";
import { env } from "src/main/config/env";
import type { BaseRouteParamsProps } from "src/main/routes";
import { Loading, PropertyCard } from "src/presentation/components";
import { errorToast } from "src/presentation/helpers/toasts";
import { useApp } from "src/presentation/hooks/use-app";
import { StaticVerticalScrollableLayout } from "src/presentation/layout";

import { ActionSheet } from "./action-sheet";
import { OwnerCard } from "./owner-card";
import { Review } from "./review";

const TouchableOpacity = createComponents(RNTouchableOpacity);

interface RouteParamsProps extends BaseRouteParamsProps {
  params: {
    type: "property" | "featured";
    id: string;
  };
}

interface PropertyDetailsProps {
  httpClient: HttpGetClient;
}
const ICON_SIZE = "7";

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  httpClient,
}: PropertyDetailsProps): JSX.Element => {
  const {
    user,
    addToBookmarks,
    removeFromBookmarks,
    system: { bottomTabs },
  } = useApp();
  const { params } = useRoute<RouteParamsProps>();
  const { navigate, goBack } = useNavigation();
  const iconColor = useToken("colors", "blue800");
  const iconSize = useToken("space", ICON_SIZE);
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState<Property>();
  const [owner, setOwner] = useState<UserData>();
  const [showActionsheet, setShowActionsheet] = useState(false);
  const isBookmarked = useMemo(
    () => user?.bookmarks.includes(params.id),
    [user?.bookmarks],
  );
  const toggleActionSheet = () => setShowActionsheet(!showActionsheet);
  const Bookmark = isBookmarked ? BookmarkFilledIcon : BookmarkIcon;
  const toggleBookmark = useCallback(() => {
    if (isBookmarked) {
      removeFromBookmarks(params.id);
      return;
    }
    addToBookmarks(params.id);
  }, [isBookmarked]);
  const fetchData = async () => {
    setLoading(true);
    try {
      const matchCategory =
        params.type === "property" ? "properties" : "featured";
      const { body } = await httpClient.get<Property[]>({
        url: `${env.ENDPOINT}/${matchCategory}?id=${params.id}`,
      });
      const { body: owners } = await httpClient.get<UserData[]>({
        url: `${env.ENDPOINT}/users?id=${params.id}`,
      });
      if (owners) setOwner(owners[0]);
      if (body) setProperty(body[0]);
      setLoading(false);
    } catch {
      toast.show(errorToast());
      navigate("home");
    }
  };
  useEffect(() => {
    bottomTabs.inactiveBottomTabs.current!();

    return () => {
      bottomTabs.activeBottomTabs.current!();
    };
  }, []);
  useEffect(() => {
    fetchData();
  }, []);
  return loading || !property || !owner ? (
    <Loading />
  ) : (
    <StaticVerticalScrollableLayout
      title="Property Details"
      onGoBack={goBack}
      RightSlot={
        <TouchableOpacity activeOpacity={0.7} onPress={toggleBookmark}>
          <Bookmark width={iconSize} height={iconSize} fill={iconColor} />
        </TouchableOpacity>
      }
    >
      <PropertyCard fullWidth {...property} />
      {property.reviews.map((review) => (
        <Review key={review.id} {...review} />
      ))}
      <OwnerCard onSchedulePress={toggleActionSheet} owner={owner} />
      <ActionSheet isOpen={showActionsheet} onClose={toggleActionSheet} />
    </StaticVerticalScrollableLayout>
  );
};

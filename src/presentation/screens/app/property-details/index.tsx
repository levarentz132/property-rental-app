import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Factory,
  HStack,
  Heading,
  ScrollView,
  VStack,
  useTheme,
  useToast,
} from "native-base";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TouchableOpacity as RNTouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BookmarkFilledIcon from "src/main/assets/colorfull-icons/bookmark-filled.svg";
import BookmarkIcon from "src/main/assets/colorfull-icons/bookmark.svg";
import ArrowBackIcon from "src/main/assets/outline-icons/arrow-left2.svg";

import { HttpGetClient } from "src/data/contracts/infra";
import { Property } from "src/domain/models";
import { env } from "src/main/config/env";
import { BaseRouteParamsProps } from "src/main/routes";
import { Loading, PropertyCard } from "src/presentation/components";
import { useApp } from "src/presentation/hooks/use-app";
import { Review } from "./review";
import { OwnerCard } from "./owner-card";

const TouchableOpacity = Factory(RNTouchableOpacity);

interface RouteParamsProps extends BaseRouteParamsProps {
  params: {
    type: "property" | "featured";
    id: string;
  };
}

interface PropertyDetailsProps {
  httpClient: HttpGetClient;
}
const ICON_SIZE = 7;

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  httpClient,
}: PropertyDetailsProps): JSX.Element => {
  const { user, addToBookmarks, removeFromBookmarks } = useApp();
  const { params } = useRoute<RouteParamsProps>();
  const { navigate, goBack } = useNavigation();
  const { colors, sizes } = useTheme();
  const toast = useToast();
  const [property, setProperty] = useState<Property>();
  const isBookmarked = useMemo(
    () => user?.bookmarks.includes(params.id),
    [user?.bookmarks],
  );
  const Bookmark = isBookmarked ? BookmarkFilledIcon : BookmarkIcon;
  const toggleBookmark = useCallback(() => {
    if (isBookmarked) {
      removeFromBookmarks(params.id);
      return;
    }
    addToBookmarks(params.id);
  }, [isBookmarked]);
  const fetchData = async () => {
    try {
      const matchCategory =
        params.type === "property" ? "properties" : "featured";
      const { body } = await httpClient.get<Property[]>({
        url: `${env.ENDPOINT}/${matchCategory}?id=${params.id}`,
      });
      if (body) setProperty(body[0]);
    } catch {
      toast.show({
        title: "Ops! Something went wrong, please try again.",
        placement: "top",
        bgColor: colors.red[500],
        marginTop: 2,
      });
      navigate("home");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return property ? (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <VStack flex={1} padding={6} space={4}>
          <HStack marginBottom={3} alignItems="center">
            <TouchableOpacity
              activeOpacity={0.7}
              marginRight={4}
              onPress={goBack}
            >
              <ArrowBackIcon
                width={sizes[ICON_SIZE]}
                height={sizes[ICON_SIZE]}
                fill={colors.primary.blue[800]}
              />
            </TouchableOpacity>
            <Heading flex={1} textTransform="capitalize">
              Property Details
            </Heading>
            <TouchableOpacity activeOpacity={0.7} onPress={toggleBookmark}>
              <Bookmark
                width={sizes[ICON_SIZE]}
                height={sizes[ICON_SIZE]}
                fill={colors.primary.blue[800]}
              />
            </TouchableOpacity>
          </HStack>
          <PropertyCard fullWidth {...property} />
          <Review />
          <OwnerCard />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  ) : (
    <Loading />
  );
};

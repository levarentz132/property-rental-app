import { createComponents, useToken } from "@gluestack-style/react";
import {
  Heading,
  HStack,
  ScrollView,
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
  VStack,
} from "@gluestack-ui/themed";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TouchableOpacity as RNTouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { HttpGetClient } from "src/data/contracts/infra";
import type { Property } from "src/domain/models";
import BookmarkIcon from "src/main/assets/colorfull-icons/bookmark.svg";
import BookmarkFilledIcon from "src/main/assets/colorfull-icons/bookmark-filled.svg";
import ArrowBackIcon from "src/main/assets/outline-icons/arrow-left2.svg";
import { env } from "src/main/config/env";
import type { BaseRouteParamsProps } from "src/main/routes";
import { Loading, PropertyCard } from "src/presentation/components";
import { useApp } from "src/presentation/hooks/use-app";

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
  const { user, addToBookmarks, removeFromBookmarks } = useApp();
  const { params } = useRoute<RouteParamsProps>();
  const { navigate, goBack } = useNavigation();
  const iconColor = useToken("colors", "blue800");
  const iconSize = useToken("space", ICON_SIZE);
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
        placement: "top",
        render: ({ id }) => {
          const toastId = `toast-${id}`;
          return (
            <Toast
              nativeID={toastId}
              action="attention"
              variant="solid"
              bgColor="$red500"
              marginTop="$2"
            >
              <VStack space="xs">
                <ToastTitle color="$white">Error</ToastTitle>
                <ToastDescription color="$white">
                  Ops! Something went wrong, please try again.
                </ToastDescription>
              </VStack>
            </Toast>
          );
        },
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
        <VStack flex={1} padding="$6" space="lg">
          <HStack marginBottom="$3" alignItems="center">
            <TouchableOpacity
              style={{ marginRight: 4 }}
              activeOpacity={0.7}
              onPress={goBack}
            >
              <ArrowBackIcon
                width={iconSize}
                height={iconSize}
                fill={iconColor}
              />
            </TouchableOpacity>
            <Heading flex={1} textTransform="capitalize">
              Property Details
            </Heading>
            <TouchableOpacity activeOpacity={0.7} onPress={toggleBookmark}>
              <Bookmark width={iconSize} height={iconSize} fill={iconColor} />
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

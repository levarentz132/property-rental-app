import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  Box,
  Center,
  Heading,
  ScrollView,
  Text,
  VStack,
  useTheme,
} from "native-base";
import { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import SearchIcon from "src/main/assets/colorfull-icons/search.svg";

import { HttpGetClient } from "src/data/contracts/infra";
import { Property } from "src/domain/models";
import { StackNavigatorRouteProps } from "src/main/routes/stack-navigator";
import { Input, PropertyCard } from "src/presentation/components";
import { useApp } from "src/presentation/hooks/use-app";
import { env } from "src/main/config/env";

interface SavedPropertyProps {
  httpClient: HttpGetClient;
}

export const SavedProperty: React.FC<SavedPropertyProps> = ({
  httpClient,
}: SavedPropertyProps): JSX.Element => {
  const { sizes } = useTheme();
  const { navigate } = useNavigation<StackNavigatorRouteProps>();
  const { user } = useApp();
  const [bookmarkList, setBookmarkList] = useState<Property[]>();
  useFocusEffect(
    useCallback(() => {
      const fetchBookmarks = async () => {
        let mergedPath = "";
        user?.bookmarks.forEach((bookmark) => {
          mergedPath += `id=${bookmark}&`;
        });
        const { body } = await httpClient.get<Property[]>({
          url: `${env.ENDPOINT}/properties?${mergedPath}`,
        });
        setBookmarkList(body);
      };
      if (user?.bookmarks.length) {
        fetchBookmarks();
      } else {
        setBookmarkList([]);
      }
    }, [user?.bookmarks.length]),
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <VStack flex={1} padding={6} space={4}>
          <Heading marginBottom={6}>Saved Property</Heading>
          <Box flex={1} marginBottom={6}>
            <Input
              placeholder="Search"
              color="blue.700"
              icon={SearchIcon}
              iconSize={sizes[6]}
              divisionColor="primary.blue.500"
            />
          </Box>
          {bookmarkList?.length ? (
            bookmarkList.map((property) => (
              <PropertyCard
                key={property.id}
                fullWidth
                marginBottom={6}
                onPress={() =>
                  navigate("property-details", {
                    type: "property",
                    id: property.id,
                  })
                }
                {...property}
              />
            ))
          ) : (
            <Center>
              <Text
                fontWeight="normal"
                color="textColor.grayDark"
                fontSize="lg"
              >
                No bookmarked properties
              </Text>
            </Center>
          )}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

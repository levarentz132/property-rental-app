import {
  Box,
  Center,
  Heading,
  ScrollView,
  Text,
  useToken,
  VStack,
} from "@gluestack-ui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import type { HttpGetClient } from "src/data/contracts/infra";
import type { Property } from "src/domain/models";
import SearchIcon from "src/main/assets/colorfull-icons/search.svg";
import { env } from "src/main/config/env";
import type { StackNavigatorRouteProps } from "src/main/routes/stack-navigator";
import { Input, PropertyCard } from "src/presentation/components";
import { useApp } from "src/presentation/hooks/use-app";

interface SavedPropertyProps {
  httpClient: HttpGetClient;
}

export const SavedProperty: React.FC<SavedPropertyProps> = ({
  httpClient,
}: SavedPropertyProps): JSX.Element => {
  const iconSize = useToken("space", "6");
  const backgroundColor = useToken("colors", "backgroundApp");
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
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <ScrollView>
        <VStack flex={1} padding="$6" space="lg">
          <Heading marginBottom="$6">Saved Property</Heading>
          <Box flex={1} marginBottom="$6">
            <Input
              placeholder="Search"
              color="$blue700"
              icon={SearchIcon}
              iconSize={iconSize}
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
              <Text fontWeight="normal" color="$textDark800" fontSize="$lg">
                No bookmarked properties
              </Text>
            </Center>
          )}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

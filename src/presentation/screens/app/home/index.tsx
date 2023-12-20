import { isAxiosError } from "axios";
import {
  Box,
  FlatList,
  ScrollView,
  VStack,
  useTheme,
  useToast,
} from "native-base";
import { ColorType } from "native-base/lib/typescript/components/types";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { HttpGetClient } from "src/data/contracts/infra";
import { Property } from "src/domain/models";
import { Filter, Group, Header } from "src/presentation/components";
import { Properties } from "./all-properties";
import { FeaturedProperties } from "./featured-properties";
import { Search } from "./search";

const BASE_URL = "http://192.168.12.85:3000";

const AnimatedVStack = Animated.createAnimatedComponent(VStack);
const AnimatedBox = Animated.createAnimatedComponent(Box);

export enum Category {
  House = "House",
  Office = "Office",
  Apartment = "Apartment",
  Land = "Land",
  Condo = "Condo",
  Other = "Other",
}

export type CategoryData = {
  category: Category;
  color: ColorType;
};

const MOCKED_CATEGORIES: CategoryData[] = [
  {
    category: Category.House,
    color: "red.500",
  },
  {
    category: Category.Office,
    color: "yellow.500",
  },
  {
    category: Category.Apartment,
    color: "green.500",
  },
  {
    category: Category.Land,
    color: "blue.500",
  },
  {
    category: Category.Condo,
    color: "purple.500",
  },
  {
    category: Category.Other,
    color: "pink.500",
  },
];

interface HomeProps {
  httpClient: HttpGetClient;
}

export const Home: React.FC<HomeProps> = ({
  httpClient,
}: HomeProps): JSX.Element => {
  const toast = useToast();
  const { colors } = useTheme();
  const [search, setSearch] = useState<string>();
  const [properties, setProperties] = useState<Property[]>([]);
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loadingProperties, setLoadingProperties] = useState<boolean>(true);
  const [loadingFeatured, setLoadingFeatured] = useState<boolean>(true);
  const [isFiltersVisible, setIsFiltersVisible] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const opacity = useSharedValue(1);
  const bgColor = useSharedValue(colors.textColor.white);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      backgroundColor: bgColor.value,
    };
  });
  const handleChangeCategory = (category: Category) => {
    setSelectedCategory(category);
  };
  const handleToggleFilters = () => {
    opacity.value = withTiming(!isFiltersVisible ? 0.5 : 1);
    bgColor.value = withTiming(
      !isFiltersVisible ? colors.muted[900] : colors.textColor.white,
    );
    setIsFiltersVisible(!isFiltersVisible);
  };
  const getAllProperties = async (url: string) => {
    try {
      setLoadingProperties(true);
      const { body = [] } = await httpClient.get<Property[]>({
        url,
      });
      setProperties(body);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.show({
          title:
            "Sorry, we couldn't get the properties, please try again later",
          placement: "top",
          bgColor: colors.red[500],
          margin: 4,
        });
      } else {
        throw error;
      }
    } finally {
      setLoadingProperties(false);
    }
  };
  const getFeaturedProperties = async () => {
    try {
      setLoadingFeatured(true);
      const { body = [] } = await httpClient.get<Property[]>({
        url: `${BASE_URL}/featured`,
      });
      setFeaturedProperties(body);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.show({
          title:
            "Sorry, we couldn't get the featured properties, please try again later",
          placement: "top",
          bgColor: colors.red[500],
          margin: 4,
        });
      } else {
        throw error;
      }
    } finally {
      setLoadingFeatured(false);
    }
  };
  useEffect(() => {
    if (selectedCategory) {
      const allPropertiesUri = new URL(
        selectedCategory ? `?category=${selectedCategory}` : "/",
        `${BASE_URL}/properties`,
      );
      const fetchPropertyDatas = async () => {
        try {
          await getAllProperties(allPropertiesUri.toString());
        } catch {
          toast.show({
            title: "Sorry, something went wrong, please try again later",
            placement: "top",
            bgColor: colors.red[500],
            margin: 4,
          });
        }
      };
      fetchPropertyDatas();
    }
  }, [selectedCategory]);
  useEffect(() => {
    const fetchPropertyDatas = async () => {
      try {
        await Promise.all([
          getAllProperties(`${BASE_URL}/properties`),
          getFeaturedProperties(),
        ]);
      } catch {
        toast.show({
          title: "Sorry, something went wrong, please try again later",
          placement: "top",
          bgColor: colors.red[500],
          margin: 4,
        });
      }
    };
    fetchPropertyDatas();
  }, []);
  return (
    <>
      <AnimatedBox flex={1} style={[animatedStyles]}>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView>
            <AnimatedVStack flex={1} style={[animatedStyles]}>
              <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
              />
              <VStack paddingX={6} paddingY={3}>
                <Header />
                <Search
                  marginTop={4}
                  inputProps={{
                    value: search,
                    onChangeText: setSearch,
                  }}
                  onFilterPress={handleToggleFilters}
                />
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={MOCKED_CATEGORIES}
                  my={3}
                  keyExtractor={({ category: name }) => name}
                  maxH={10}
                  minH={10}
                  renderItem={({ item }) => (
                    <Group
                      active={
                        selectedCategory?.toUpperCase() ===
                        item.category.toUpperCase()
                      }
                      color={item.color}
                      category={item.category}
                      onSelect={handleChangeCategory}
                      paddingX={4}
                    />
                  )}
                />
              </VStack>
              <Properties
                properties={properties}
                marginBottom={2}
                loading={loadingProperties}
              />
              <FeaturedProperties
                properties={featuredProperties}
                loading={loadingFeatured}
              />
            </AnimatedVStack>
          </ScrollView>
        </SafeAreaView>
      </AnimatedBox>
      {isFiltersVisible && <Filter onCLose={handleToggleFilters} />}
    </>
  );
};

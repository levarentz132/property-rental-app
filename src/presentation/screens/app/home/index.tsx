import { Box, FlatList, ScrollView, VStack, useTheme } from "native-base";
import { ColorType } from "native-base/lib/typescript/components/types";
import React, { useState } from "react";
import { StatusBar } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { Filter, Group, Header } from "src/presentation/components";
import { Properties } from "./all-properties";
import { FeaturedProperties } from "./featured-properties";
import { Search } from "./search";

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

export const Home: React.FC = (): JSX.Element => {
  const { colors } = useTheme();
  const [search, setSearch] = useState<string>();
  const [isFiltersVisible, setIsFiltersVisible] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    Category.House,
  );
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
              <VStack padding={6}>
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
                  my={6}
                  keyExtractor={({ category: name }) => name}
                  maxH={10}
                  minH={10}
                  renderItem={({ item }) => (
                    <Group
                      active={
                        selectedCategory.toUpperCase() ===
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
              <Properties marginBottom={2} />
              <FeaturedProperties />
            </AnimatedVStack>
          </ScrollView>
        </SafeAreaView>
      </AnimatedBox>
      {isFiltersVisible && <Filter onCLose={handleToggleFilters} />}
    </>
  );
};

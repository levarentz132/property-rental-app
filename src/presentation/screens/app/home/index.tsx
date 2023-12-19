import { FlatList, ScrollView, VStack } from "native-base";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ColorType } from "native-base/lib/typescript/components/types";

import { Search } from "./search";
import { Filter, Group, Header } from "src/presentation/components";
import { Properties } from "./all-properties";
import { FeaturedProperties } from "./featured-properties";

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
  const [search, setSearch] = useState<string>();
  const [isFiltersVisible, setIsFiltersVisible] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    Category.House,
  );
  const handleChangeCategory = (category: Category) => {
    setSelectedCategory(category);
  };
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <VStack
            flex={1}
            bgColor={isFiltersVisible ? "muted.900" : "textColor.white"}
            opacity={isFiltersVisible ? 0.5 : 1}
          >
            <VStack padding={6}>
              <Header />
              <Search
                marginTop={4}
                inputProps={{
                  value: search,
                  onChangeText: setSearch,
                }}
                onFilterPress={() => setIsFiltersVisible(!isFiltersVisible)}
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
          </VStack>
        </ScrollView>
        {isFiltersVisible && <Filter position="absolute" bottom={0} />}
      </SafeAreaView>
    </>
  );
};

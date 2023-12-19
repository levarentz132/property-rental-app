import { FlatList, VStack } from "native-base";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ColorType } from "native-base/lib/typescript/components/types";

import { Search } from "./search";
import { Group, Header } from "src/presentation/components";
import { Properties } from "./properties";

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
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    Category.House,
  );
  const handleChangeCategory = (category: Category) => {
    setSelectedCategory(category);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack flex={1} padding={6} bgColor="textColor.white">
        <Header />
        <Search
          marginTop={4}
          inputProps={{
            value: search,
            onChangeText: setSearch,
          }}
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
                selectedCategory.toUpperCase() === item.category.toUpperCase()
              }
              color={item.color}
              category={item.category}
              onSelect={handleChangeCategory}
              paddingX={4}
            />
          )}
        />
        <Properties />
      </VStack>
    </SafeAreaView>
  );
};

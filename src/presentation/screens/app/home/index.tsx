import { isAxiosError } from "axios";
import {
  FlatList,
  ScrollView,
  useDisclose,
  useTheme,
  useToast,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { HttpGetClient } from "src/data/contracts/infra";
import type { Property } from "src/domain/models";
import { env } from "src/main/config/env";
import { Group, Header } from "src/presentation/components";

import { ActionSheet } from "./action-sheet";
import { Properties } from "./all-properties";
import { FeaturedProperties } from "./featured-properties";
import { Search } from "./search";

// eslint-disable-next-line react-refresh/only-export-components
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
  color: string;
};

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
  const { isOpen, onOpen, onClose } = useDisclose();
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  const MOCKED_CATEGORIES: CategoryData[] = [
    {
      category: Category.House,
      color: colors.red[500],
    },
    {
      category: Category.Office,
      color: colors.yellow[500],
    },
    {
      category: Category.Apartment,
      color: colors.green[500],
    },
    {
      category: Category.Land,
      color: colors.blue[500],
    },
    {
      category: Category.Condo,
      color: colors.purple[500],
    },
    {
      category: Category.Other,
      color: colors.muted[500],
    },
  ];
  const handleChangeCategory = (category: Category) => {
    setSelectedCategory(category);
  };
  const handleToggleFilters = () => {
    onOpen();
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
        url: `${env.ENDPOINT}/featured`,
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
        `${env.ENDPOINT}/properties`,
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
          getAllProperties(`${env.ENDPOINT}/properties`),
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
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack>
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
                _contentContainerStyle={{
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  gap: 2,
                }}
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
              marginBottom={2}
            />
          </VStack>
        </ScrollView>
      </SafeAreaView>
      <ActionSheet isOpen={isOpen} onClose={onClose} />
    </>
  );
};

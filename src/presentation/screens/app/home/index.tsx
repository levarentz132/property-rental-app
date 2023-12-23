import {
  FlatList,
  ScrollView,
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
  useToken,
  VStack,
} from "@gluestack-ui/themed";
import { isAxiosError } from "axios";
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
  // const { colors } = useTheme();
  const [search, setSearch] = useState<string>();
  const colorHouse = useToken("colors", "red500");
  const colorOffice = useToken("colors", "yellow500");
  const colorApartment = useToken("colors", "green500");
  const colorLand = useToken("colors", "blue500");
  const colorCondo = useToken("colors", "purple500");
  const colorOther = useToken("colors", "muted500");
  const [properties, setProperties] = useState<Property[]>([]);
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loadingProperties, setLoadingProperties] = useState<boolean>(true);
  const [loadingFeatured, setLoadingFeatured] = useState<boolean>(true);
  const [showActionsheet, setShowActionsheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  const handleClose = () => setShowActionsheet(!showActionsheet);

  const MOCKED_CATEGORIES: CategoryData[] = [
    {
      category: Category.House,
      color: colorHouse,
    },
    {
      category: Category.Office,
      color: colorOffice,
    },
    {
      category: Category.Apartment,
      color: colorApartment,
    },
    {
      category: Category.Land,
      color: colorLand,
    },
    {
      category: Category.Condo,
      color: colorCondo,
    },
    {
      category: Category.Other,
      color: colorOther,
    },
  ];
  const handleChangeCategory = (category: Category) => {
    setSelectedCategory(category);
  };
  const handleToggleFilters = () => {
    // onOpen();
    setShowActionsheet(!showActionsheet);
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
                    Sorry, we couldn&apos;t get the properties, please try again
                    later.
                  </ToastDescription>
                </VStack>
              </Toast>
            );
          },
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
                    Sorry, we couldn&apos;t get the featured properties, please
                    try again later.
                  </ToastDescription>
                </VStack>
              </Toast>
            );
          },
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
                      Sorry, something went wrong, please try again later.
                    </ToastDescription>
                  </VStack>
                </Toast>
              );
            },
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
                    Sorry, something went wrong, please try again later.
                  </ToastDescription>
                </VStack>
              </Toast>
            );
          },
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
            <VStack paddingHorizontal="$6" paddingVertical="$3">
              <Header />
              <Search
                marginTop="$4"
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
                my="$3"
                keyExtractor={(element) => (element as CategoryData).category}
                maxHeight="$10"
                contentContainerStyle={{
                  gap: 8,
                }}
                minHeight="$10"
                renderItem={(data) => {
                  const item = data.item as CategoryData;
                  return (
                    <Group
                      active={
                        selectedCategory?.toUpperCase() ===
                        item.category.toUpperCase()
                      }
                      color={item.color}
                      category={item.category}
                      onSelect={handleChangeCategory}
                      paddingHorizontal="$4"
                    />
                  );
                }}
              />
            </VStack>
            <Properties
              properties={properties}
              marginBottom="$2"
              loading={loadingProperties}
            />
            <FeaturedProperties
              properties={featuredProperties}
              loading={loadingFeatured}
              marginBottom="$2"
            />
          </VStack>
        </ScrollView>
      </SafeAreaView>
      <ActionSheet isOpen={showActionsheet} onClose={handleClose} />
    </>
  );
};

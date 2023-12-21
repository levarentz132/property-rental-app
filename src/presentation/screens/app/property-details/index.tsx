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
import { useEffect, useState } from "react";
import { TouchableOpacity as RNTouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { HttpGetClient } from "src/data/contracts/infra";
import { Property } from "src/domain/models";
import ArrowBackIcon from "src/main/assets/outline-icons/arrow-left2.svg";
import { BaseRouteParamsProps } from "src/main/routes";
import { Loading, PropertyCard } from "src/presentation/components";
import { Review } from "./review";

const BASE_URL = "http://192.168.1.244:3000";
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

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  httpClient,
}: PropertyDetailsProps): JSX.Element => {
  const { params } = useRoute<RouteParamsProps>();
  const { navigate, goBack } = useNavigation();
  const { colors, sizes } = useTheme();
  const toast = useToast();
  const [property, setProperty] = useState<Property>();
  const fetchData = async () => {
    console.log(params.id);
    try {
      const matchCategory =
        params.type === "property" ? "properties" : "featured";
      const { body } = await httpClient.get<Property[]>({
        url: `${BASE_URL}/${matchCategory}?id=${params.id}`,
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
                width={sizes[7]}
                height={sizes[7]}
                fill={colors.primary.blue[800]}
              />
            </TouchableOpacity>
            <Heading textTransform="capitalize">Property Details</Heading>
          </HStack>
          <PropertyCard fullWidth {...property} />
          <Review />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  ) : (
    <Loading />
  );
};

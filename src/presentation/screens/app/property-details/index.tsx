import { Heading, ScrollView, VStack } from "native-base";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { HttpGetClient } from "src/data/contracts/infra";
import { Property } from "src/domain/models";
import { Loading, PropertyCard } from "src/presentation/components";

import { Review } from "./review";

const MOCK_ID = "2";
const BASE_URL = "http://192.168.12.85:3000";

interface PropertyDetailsProps {
  httpClient: HttpGetClient;
}

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  httpClient,
}: PropertyDetailsProps): JSX.Element => {
  const [property, setProperty] = useState<Property>();
  useEffect(() => {
    const fetchData = async () => {
      const { body } = await httpClient.get<Property[]>({
        url: `${BASE_URL}/properties?id=${MOCK_ID}`,
      });
      if (body) setProperty(body[0]);
    };
    fetchData();
  }, []);
  return property ? (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <VStack flex={1} padding={6} space={4}>
          <Heading textTransform="capitalize" marginBottom={3}>
            Property Details
          </Heading>
          <PropertyCard fullWidth {...property} />
          <Review />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  ) : (
    <Loading />
  );
};

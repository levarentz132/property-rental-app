import {
  Heading,
  HStack,
  ScrollView,
  Text,
  useToast,
  useToken,
  VStack,
} from "@gluestack-ui/themed";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Pressable, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { HttpGetClient } from "src/data/contracts/infra";
import type { Property, UserData } from "src/domain/models";
import CallIcon from "src/main/assets/colorfull-icons/call.svg";
import MessagesIcon from "src/main/assets/colorfull-icons/messages.svg";
import ScheduleIcon from "src/main/assets/colorfull-icons/schedule.svg";
import ArrowBackIcon from "src/main/assets/outline-icons/arrow-left2.svg";
import { env } from "src/main/config/env";
import type { BaseRouteParamsProps } from "src/main/routes";
import {
  CardButton,
  Loading,
  PropertyCard,
  UserSignature,
} from "src/presentation/components";
import { errorToast } from "src/presentation/helpers/toasts";

interface RouteParamsProps extends BaseRouteParamsProps {
  params: {
    id: string;
  };
}

interface OwnerProfileProps {
  httpClient: HttpGetClient;
}

export const OwnerProfile: React.FC<OwnerProfileProps> = ({
  httpClient,
}: OwnerProfileProps) => {
  const { params } = useRoute<RouteParamsProps>();
  const toast = useToast();
  const [owner, setOwner] = useState<UserData>({} as UserData);
  const [ownerProperties, setOwnerProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const backgroundColor = useToken("colors", "backgroundApp");
  const iconSize = useToken("space", "7");
  const iconColor = useToken("colors", "blue800");
  const { goBack } = useNavigation();

  const fetchOwnerProperties = async () => {
    try {
      const { body = [] } = await httpClient.get<Property[]>({
        url: `${env.ENDPOINT}/properties?owner_id=${params.id}`,
      });
      setOwnerProperties(body);
    } catch (error) {
      console.log({ error });
    }
  };
  const fetchOwner = async () => {
    try {
      const { body } = await httpClient.get<UserData[]>({
        url: `${env.ENDPOINT}/users?id=${params.id}`,
      });
      if (body) {
        setOwner(body[0]);
      } else {
        toast.closeAll();
        toast.show(errorToast());
        goBack();
      }
    } catch (error) {
      console.log({ error });
      goBack();
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOwner();
    fetchOwnerProperties();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <ScrollView>
        <VStack flex={1} padding="$6" space="lg">
          <HStack marginBottom="$3" alignItems="center">
            <TouchableOpacity
              style={{ marginRight: 4 }}
              activeOpacity={0.7}
              onPress={goBack}
            >
              <ArrowBackIcon
                width={iconSize}
                height={iconSize}
                fill={iconColor}
              />
            </TouchableOpacity>
            <Heading flex={1} textTransform="capitalize">
              Owner Profile
            </Heading>
          </HStack>
          <VStack flex={1} rounded="$3xl" bgColor="transparent">
            <Pressable onPress={() => {}}>
              <UserSignature
                marginBottom="$5"
                name={owner.realName}
                userRole={owner.userRole}
                uri={owner.profilePicture}
              />
            </Pressable>
            <HStack space="lg" justifyContent="space-between">
              <CardButton
                flex={1}
                icon={MessagesIcon}
                bgColor="$blue100"
                label="Message"
              />
              <CardButton
                flex={1}
                icon={ScheduleIcon}
                bgColor="$orange100"
                label="Schedule"
                onPress={() => {}}
              />
              <CardButton
                flex={1}
                icon={CallIcon}
                bgColor="$green100"
                label="Call"
              />
            </HStack>
          </VStack>
          <VStack flex={1}>
            <HStack alignItems="center">
              <Heading
                fontSize="$md"
                fontWeight="bold"
                flex={1}
                marginBottom="$2"
              >
                Property
              </Heading>
            </HStack>
            {ownerProperties.length ? (
              ownerProperties.map((item) => (
                <PropertyCard
                  key={item.id}
                  view="landscape"
                  paddingBottom="$3"
                  onPress={
                    () => {}
                    // navigate("property-details", {
                    //   type: "featured",
                    //   id: item.id,
                    // })
                  }
                  {...item}
                />
              ))
            ) : (
              <Text marginLeft="$6" color="$textDark800">
                No featured properties found
              </Text>
            )}
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

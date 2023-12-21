import {
  Box,
  Factory,
  HStack,
  Heading,
  IStackProps,
  Text,
  VStack,
} from "native-base";
import { Image as ExpoImage } from "expo-image";

const Image = Factory(ExpoImage);

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

interface UserSignatureProps extends IStackProps {
  name: string;
  userRole: string;
  uri: string;
}

export const UserSignature: React.FC<UserSignatureProps> = ({
  name,
  userRole,
  uri,
  ...props
}: UserSignatureProps) => (
  <HStack {...props}>
    <Box rounded="2xl" bgColor="gray.400" w={12} h={12} marginRight={2}>
      <Image
        rounded="2xl"
        width="100%"
        height="100%"
        contentFit="cover"
        placeholder={blurhash}
        source={{ uri }}
      />
    </Box>
    <VStack>
      <Heading size="sm">{name}</Heading>
      <Text>{userRole}</Text>
    </VStack>
  </HStack>
);

import {
  Box,
  createComponents,
  Heading,
  HStack,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { Image as ExpoImage } from "expo-image";
import type { ComponentProps } from "react";

const Image = createComponents(ExpoImage);

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

interface UserSignatureProps extends ComponentProps<typeof HStack> {
  name: string;
  userRole: string;
  uri: string;
  suffix?: string;
}

export const UserSignature: React.FC<UserSignatureProps> = ({
  name,
  userRole,
  suffix,
  uri,
  ...props
}: UserSignatureProps) => (
  <HStack {...props}>
    <Box rounded="$2xl" width="$12" height="$12" marginRight="$2">
      <Image
        style={{ borderRadius: 100, width: "100%", height: "100%" }}
        contentFit="cover"
        placeholder={blurhash}
        source={{ uri }}
      />
    </Box>
    <VStack>
      <HStack space="xs" justifyContent="flex-start" alignItems="baseline">
        <Heading size="sm">{name}</Heading>
        {suffix && (
          <Text
            color="$textDark700"
            fontSize="$xs"
            maxWidth="$64"
            fontFamily="$heading"
            numberOfLines={1}
          >
            {suffix}
          </Text>
        )}
      </HStack>
      <Text
        color="$textDark700"
        fontSize="$sm"
        maxWidth="$64"
        numberOfLines={1}
      >
        {userRole}
      </Text>
    </VStack>
  </HStack>
);

import {
  Box,
  createComponents,
  Heading,
  HStack,
  Text,
  useToken,
  View,
  VStack,
} from "@gluestack-ui/themed";
import { Image as ExpoImage } from "expo-image";
import type { ComponentProps } from "react";
import { TouchableOpacity } from "react-native";
import type { Message } from "src/domain/models";

import { blurhash } from "../helpers/blur-hash";

const Image = createComponents(ExpoImage);

interface MessageCardProps
  extends Omit<Message, "id">,
    ComponentProps<typeof TouchableOpacity> {
  onPress: () => void;
  containerProps?: ComponentProps<typeof HStack>;
}

export const MessageCard: React.FC<MessageCardProps> = ({
  atoms,
  from,
  image,
  onPress,
  containerProps,
  ...props
}: MessageCardProps): JSX.Element => {
  const borderRadius = useToken("radii", "2xl");
  // const { navigate } = useNavigation();
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} {...props}>
      <HStack {...containerProps}>
        <Box
          rounded="$2xl"
          bgColor="$trueGray400"
          w="$12"
          h="$12"
          position="relative"
          marginRight="$4"
        >
          <Image
            style={{
              borderRadius,
              width: "100%",
              height: "100%",
            }}
            contentFit="cover"
            placeholder={blurhash}
            source={{ uri: image }}
          />
          <View
            zIndex={2}
            position="absolute"
            bottom="$1"
            left="$10"
            rounded="$full"
            bgColor="$success400"
            width="$4"
            height="$4"
            borderWidth="$2"
            borderColor="$white"
          />
        </Box>
        <VStack flex={1}>
          <Heading size="sm" color="$textDark800">
            {from}
          </Heading>
          <Text color="$textDark600" size="sm">
            {atoms[atoms.length - 1]?.message}
          </Text>
        </VStack>
        <Text fontSize="$xs" color="$green500">
          {atoms[atoms.length - 1]?.date.toLocaleDateString()}
        </Text>
      </HStack>
    </TouchableOpacity>
  );
};

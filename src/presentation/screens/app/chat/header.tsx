import { createComponents, useToken } from "@gluestack-style/react";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
  Box,
  Heading,
  HStack,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import type { ComponentProps } from "react";
import { TouchableOpacity as RNTouchableOpacity } from "react-native";
import CallIcon from "src/main/assets/filled-icons/call.svg";
import VideoIcon from "src/main/assets/filled-icons/video.svg";
import ArrowBackIcon from "src/main/assets/outline-icons/arrow-left2.svg";
import type { StackMessagesNavigatorRouteProps } from "src/main/routes/stack-messages-navigator";

const ICON_SIZE = "7";

const TouchableOpacity = createComponents(RNTouchableOpacity);

interface HeaderProps extends ComponentProps<typeof HStack> {
  avatarUrl?: string;
  username: string;
}

export const Header: React.FC<HeaderProps> = ({
  username,
  avatarUrl,
  ...props
}: HeaderProps): JSX.Element => {
  const { goBack } = useNavigation<StackMessagesNavigatorRouteProps>();
  const iconColor = useToken("colors", "blue800");
  const iconSize = useToken("space", ICON_SIZE);
  return (
    <HStack alignItems="center" justifyContent="center" {...props}>
      <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
        <ArrowBackIcon width={iconSize} height={iconSize} fill={iconColor} />
      </TouchableOpacity>
      <Avatar bgColor="$indigo600" rounded="$2xl" marginHorizontal="$2">
        <AvatarFallbackText>{username}</AvatarFallbackText>
        <AvatarImage
          rounded="$2xl"
          alt="User profile picture"
          source={{ uri: avatarUrl }}
        />
        <AvatarBadge $dark-borderColor="$black" />
      </Avatar>
      <VStack flex={1} marginLeft="$1">
        <Heading size="sm">{username}</Heading>
        <Text size="sm">Nursing Assistant</Text>
      </VStack>
      <HStack space="sm">
        <TouchableOpacity
          style={{ marginRight: 4 }}
          activeOpacity={0.7}
          onPress={goBack}
        >
          <Box padding="$2" bgColor="$blue100" borderRadius="$2xl">
            <CallIcon width={iconSize} height={iconSize} fill={iconColor} />
          </Box>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginRight: 4 }}
          activeOpacity={0.7}
          onPress={goBack}
        >
          <Box padding="$2" bgColor="$blue100" borderRadius="$2xl">
            <VideoIcon width={iconSize} height={iconSize} fill={iconColor} />
          </Box>
        </TouchableOpacity>
      </HStack>
    </HStack>
  );
};

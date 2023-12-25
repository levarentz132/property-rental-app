import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
  Box,
  HStack,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import dayjs from "dayjs";
import type { ComponentProps } from "react";
import type { MessageAtom } from "src/domain/models";

interface MessagesProps extends ComponentProps<typeof VStack> {
  message: MessageAtom;
  avatarUrl?: string;
}

export const Messages: React.FC<MessagesProps> = ({
  avatarUrl,
  message,
  ...props
}: MessagesProps): JSX.Element => {
  const isIncoming = message.from === "incoming";
  const isOutgoing = !isIncoming;
  return (
    <VStack {...props}>
      <HStack alignItems="flex-end" marginBottom="$3">
        {isOutgoing && <Box flex={1} />}
        {isIncoming && (
          <Avatar bgColor="$indigo600" rounded="$2xl" marginRight="$4">
            <AvatarFallbackText>Ronald Richards</AvatarFallbackText>
            <AvatarImage
              rounded="$2xl"
              alt="User profile picture"
              source={{ uri: avatarUrl }}
            />
            <AvatarBadge $dark-borderColor="$black" />
          </Avatar>
        )}
        <Box
          position="relative"
          bgColor={isIncoming ? "$white" : "$blue700"}
          padding="$4"
          rounded="$2xl"
          softShadow="1"
          borderBottomRightRadius={isIncoming ? "$2xl" : "$none"}
          borderBottomLeftRadius={isOutgoing ? "$2xl" : "$none"}
        >
          <Text maxWidth="$64" color={isIncoming ? "$textDark600" : "$white"}>
            {message.message}
          </Text>
          <Text
            position="absolute"
            bottom="-$10"
            marginBottom="$3"
            right={isOutgoing ? 0 : undefined}
          >
            {dayjs(message.date).format("HH:mm [on] MM/DD/YYYY")}
          </Text>
        </Box>
        {isIncoming && <Box flex={1} />}
      </HStack>
    </VStack>
  );
};

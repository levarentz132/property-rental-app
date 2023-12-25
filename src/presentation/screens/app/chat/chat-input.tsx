import { Box, HStack, Pressable, useToken } from "@gluestack-ui/themed";
import type { ComponentProps } from "react";
import EmojiIcon from "src/main/assets/colorfull-icons/emoji.svg";
import PlusIcon from "src/main/assets/colorfull-icons/plus.svg";
import SendIcon from "src/main/assets/colorfull-icons/send.svg";
import { Input } from "src/presentation/components";

interface ChatInputProps extends ComponentProps<typeof HStack> {}

export const ChatInput: React.FC<ChatInputProps> = ({
  ...props
}: ChatInputProps): JSX.Element => {
  const iconSize = useToken("space", "4");
  const emojiIconSize = useToken("space", "10");
  return (
    <HStack rounded="$2xl" bgColor="$white" width="$full" {...props}>
      <Box flex={1}>
        <Input
          placeholder="Type something..."
          color="$blue700"
          fontSize="$sm"
        />
      </Box>
      <Box flex={0.2}>
        <Pressable
          justifyContent="center"
          alignItems="center"
          height="$16"
          bgColor="$white"
        >
          <PlusIcon
            width={emojiIconSize}
            height={emojiIconSize}
            onPress={() => {}}
          />
        </Pressable>
      </Box>
      <HStack
        flex={0.5}
        bgColor="$blue700"
        borderTopRightRadius="$2xl"
        borderBottomRightRadius="$2xl"
      >
        <Box flex={0.6}>
          <Pressable
            justifyContent="center"
            alignItems="center"
            height="$16"
            bgColor="$white"
            borderTopRightRadius="$2xl"
            borderBottomRightRadius="$2xl"
          >
            <EmojiIcon
              width={emojiIconSize}
              height={emojiIconSize}
              onPress={() => {}}
            />
          </Pressable>
        </Box>
        <Box flex={0.5}>
          <Pressable justifyContent="center" alignItems="center" height="$16">
            <SendIcon width={iconSize} height={iconSize} onPress={() => {}} />
          </Pressable>
        </Box>
      </HStack>
    </HStack>
  );
};

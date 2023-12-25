import { Box, HStack, Pressable, useToken } from "@gluestack-ui/themed";
import type { ComponentProps } from "react";
import PenIcon from "src/main/assets/colorfull-icons/pen.svg";
import SearchIcon from "src/main/assets/colorfull-icons/search.svg";
import type { InputProps } from "src/presentation/components";
import { Input } from "src/presentation/components";

interface SearchProps extends ComponentProps<typeof HStack> {
  inputProps: Pick<InputProps, "value" | "onChangeText">;
  onNewMessage: () => void;
}

export const Search: React.FC<SearchProps> = ({
  inputProps,
  onNewMessage: onFilterPress,
  ...props
}: SearchProps): JSX.Element => {
  const sizes = useToken("space", "6");
  return (
    <HStack width="$full" space="xl" {...props}>
      <Box flex={1}>
        <Input
          placeholder="Search"
          color="$blue700"
          icon={SearchIcon}
          iconSize={sizes}
          {...inputProps}
        />
      </Box>
      <Pressable
        justifyContent="center"
        alignItems="center"
        bgColor="$green100"
        width="$16"
        height="$16"
        rounded="$2xl"
      >
        <PenIcon width={sizes} height={sizes} onPress={onFilterPress} />
      </Pressable>
    </HStack>
  );
};

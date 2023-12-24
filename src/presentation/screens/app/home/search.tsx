import { Box, HStack, useToken } from "@gluestack-ui/themed";
import type { ComponentProps } from "react";
import FilterIcon from "src/main/assets/colorfull-icons/filter.svg";
import SearchIcon from "src/main/assets/colorfull-icons/search.svg";
import type { InputProps } from "src/presentation/components";
import { Button, Input } from "src/presentation/components";

interface SearchProps extends ComponentProps<typeof HStack> {
  inputProps: Pick<InputProps, "value" | "onChangeText">;
  onFilterPress: () => void;
}

export const Search: React.FC<SearchProps> = ({
  inputProps,
  onFilterPress,
  ...props
}: SearchProps): JSX.Element => {
  const sizes = useToken("sizes", "6");
  return (
    <HStack width="$full" py={3} space="md" {...props}>
      <Box flex={1}>
        <Input
          placeholder="Search"
          color="$blue700"
          icon={SearchIcon}
          iconSize={sizes}
          {...inputProps}
        />
      </Box>
      <Box flex={0.5} justifyContent="center" alignItems="center">
        <Button
          addorment={FilterIcon}
          title="Filters"
          onPress={onFilterPress}
        />
      </Box>
    </HStack>
  );
};

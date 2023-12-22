import type { IInputProps, IStackProps } from "native-base";
import { Box, HStack, useTheme } from "native-base";
import FilterIcon from "src/main/assets/colorfull-icons/filter.svg";
import SearchIcon from "src/main/assets/colorfull-icons/search.svg";
import { Button, Input } from "src/presentation/components";

interface SearchProps extends IStackProps {
  inputProps: Pick<IInputProps, "value" | "onChangeText">;
  onFilterPress: () => void;
}

export const Search: React.FC<SearchProps> = ({
  inputProps,
  onFilterPress,
  ...props
}: SearchProps): JSX.Element => {
  const { sizes } = useTheme();
  return (
    <HStack width="100%" py={3} space={4} {...props}>
      <Box flex={1}>
        <Input
          placeholder="Search"
          color="blue.700"
          icon={SearchIcon}
          iconSize={sizes[6]}
          divisionColor="primary.blue.500"
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

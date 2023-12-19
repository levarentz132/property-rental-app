import { Box, HStack, IInputProps, IStackProps } from "native-base";
import { Button, Input } from "src/presentation/components";

import FilterIcon from "src/main/assets/colorfull-icons/filter.svg";
import SearchIcon from "src/main/assets/colorfull-icons/search.svg";

interface SearchProps extends IStackProps {
  inputProps: Pick<IInputProps, "value" | "onChangeText">;
}

export const Search: React.FC<SearchProps> = ({
  inputProps,
  ...props
}: SearchProps): JSX.Element => {
  return (
    <HStack width="100%" {...props}>
      <Box flex={1}>
        <Input
          placeholder="Search"
          my={2}
          icon={SearchIcon}
          iconSize={30}
          divisionColor="primary.blue.500"
          {...inputProps}
        />
      </Box>
      <Box flex={0.5} justifyContent="center" alignItems="center">
        <Button addorment={FilterIcon} title="Filters" />
      </Box>
    </HStack>
  );
};

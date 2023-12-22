import {
  Actionsheet as RNActionsheet,
  Heading,
  HStack,
  Text,
  VStack,
} from "native-base";
import { Button } from "src/presentation/components";
import { MultiSlider } from "src/presentation/components/multi-slider";

interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ActionSheet: React.FC<ActionSheetProps> = ({
  isOpen,
  onClose,
}: ActionSheetProps): JSX.Element => (
  <RNActionsheet isOpen={isOpen} onClose={onClose}>
    <RNActionsheet.Content>
      <VStack padding={4}>
        <Heading alignSelf="center" fontSize="xl" marginBottom={4}>
          Filter
        </Heading>
        <Text fontSize="lg" fontWeight="bold" marginBottom={16}>
          Property types
        </Text>
        <HStack marginBottom={2}>
          <Text flex={1} fontSize="md" fontWeight="bold">
            Property Size
          </Text>
          <Text
            fontSize="sm"
            fontWeight="bold"
            color="secondary.sky"
            opacity={0.7}
          >
            Up to 5000 m²
          </Text>
        </HStack>
        <MultiSlider
          values={[10, 200]}
          min={0}
          max={1000}
          step={10}
          valueSuffix="m²"
        />
        <Text fontSize="md" fontWeight="bold" marginBottom={2} marginTop={8}>
          Property Price
        </Text>
        <HStack>
          <Text flex={1} fontSize="xs" fontWeight="normal">
            Low
          </Text>
          <Text fontSize="xs" fontWeight="normal">
            High
          </Text>
        </HStack>
        <MultiSlider
          values={[0, 1000000]}
          min={0}
          max={2000000}
          step={10000}
          valuePrefix="$"
        />
        <HStack width="100%" space={4} marginTop={8}>
          <Button flex={0.5} title="Reset" variant="outline" />
          <Button flex={1} title="Check availability" />
        </HStack>
      </VStack>
    </RNActionsheet.Content>
  </RNActionsheet>
);

import {
  Actionsheet as RNActionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  Heading,
  HStack,
  Text,
  VStack,
} from "@gluestack-ui/themed";
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
    <ActionsheetBackdrop />
    <ActionsheetContent>
      <ActionsheetDragIndicatorWrapper>
        <ActionsheetDragIndicator />
      </ActionsheetDragIndicatorWrapper>
      <VStack padding="$4">
        <Heading alignSelf="center" fontSize="$xl" marginBottom="$4">
          Filter
        </Heading>
        <Text fontSize="$lg" fontWeight="bold" marginBottom="$16" fontFamily="">
          Property types
        </Text>
        <HStack marginBottom="$2">
          <Text flex={1} fontSize="$md" fontWeight="bold">
            Property Size
          </Text>
          <Text
            fontSize="$sm"
            fontWeight="bold"
            color="$lightBlue400"
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
        <Text fontSize="$md" fontWeight="bold" marginBottom="$2" marginTop="$8">
          Property Price
        </Text>
        <HStack>
          <Text flex={1} fontSize="$xs" fontWeight="normal">
            Low
          </Text>
          <Text fontSize="$xs" fontWeight="normal">
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
        <HStack width="100%" space="lg" marginTop="$8">
          <Button flex={0.5} title="Reset" variant="outline" />
          <Button flex={1} title="Check availability" />
        </HStack>
      </VStack>
    </ActionsheetContent>
  </RNActionsheet>
);

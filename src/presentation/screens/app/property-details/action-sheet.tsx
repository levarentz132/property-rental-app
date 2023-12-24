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
import dayjs from "dayjs";
import { useState } from "react";
import {
  Button,
  DatePicker,
  Input,
  TimePicker,
} from "src/presentation/components";

interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ActionSheet: React.FC<ActionSheetProps> = ({
  isOpen,
  onClose,
}: ActionSheetProps): JSX.Element => {
  const [date, setDate] = useState(dayjs().toDate());
  const [startTime, setStartTime] = useState(dayjs().toDate());
  const [endTime, setEndTime] = useState(dayjs().add(30, "m").toDate());

  return (
    <RNActionsheet isOpen={isOpen} onClose={onClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <VStack padding="$4" width="100%">
          <Heading alignSelf="center" fontSize="$xl" marginBottom="$4">
            Get Schedule
          </Heading>
          <Text fontSize="$md" fontWeight="bold" marginBottom="$2">
            Title
          </Text>
          <Input
            placeholder="Meeting Name"
            bgColor="$violet100"
            borderWidth="$0"
          />
          <Text
            fontSize="$md"
            fontWeight="bold"
            marginBottom="$2"
            marginTop="$8"
          >
            Choose Date
          </Text>
          <DatePicker value={date} onChange={setDate} />
          <HStack width="100%" space="lg" marginTop="$8">
            <VStack flex={1} space="sm">
              <Text fontFamily="$heading" fontSize="$sm">
                Start Time
              </Text>
              <TimePicker is24Hour value={startTime} onChange={setStartTime} />
            </VStack>
            <VStack flex={1} space="sm">
              <Text fontFamily="$heading" fontSize="$sm">
                End Time
              </Text>
              <TimePicker is24Hour value={endTime} onChange={setEndTime} />
            </VStack>
          </HStack>
          <HStack width="100%" space="lg" marginTop="$8">
            <Button flex={1} title="Add for schedule" />
          </HStack>
        </VStack>
      </ActionsheetContent>
    </RNActionsheet>
  );
};

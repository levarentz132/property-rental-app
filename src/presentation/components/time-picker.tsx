import {
  HStack,
  Pressable,
  Text,
  useToken,
  VStack,
} from "@gluestack-ui/themed";
import { type DateTimePickerEvent } from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import type { ComponentProps } from "react";
import React, { useState } from "react";
import { Platform } from "react-native";
import ClockIcon from "src/main/assets/colorfull-icons/time-circle.svg";

const isAndroid = Platform.OS === "android";

interface DateTimePickerProps {
  value: Date;
  onChange: (selectedDate: Date) => void;
  is24Hour?: boolean;
  wrapperProps?: ComponentProps<typeof HStack>;
}

export const TimePicker: React.FC<DateTimePickerProps> = ({
  value,
  onChange,
  is24Hour,
  wrapperProps,
}: DateTimePickerProps) => {
  const selectDateColor = useToken("colors", "green400");
  const [show, setShow] = useState(false);

  const handleChangeDate = (
    { type }: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    if (type === "dismissed") return setShow(false);
    const currentDate = selectedDate;
    if (currentDate) onChange(currentDate);
    if (isAndroid) {
      setShow(false);
    }
    return undefined;
  };

  return (
    <VStack {...wrapperProps}>
      <Pressable
        onPress={() => setShow((prev) => !prev)}
        justifyContent="center"
      >
        <HStack
          height="$14"
          bgColor="$violet100"
          alignItems="center"
          paddingHorizontal="$4"
        >
          <Text flex={1}>{dayjs(value).format("HH:mm")}</Text>
          <ClockIcon />
        </HStack>
      </Pressable>
      {show && (
        <DateTimePicker
          value={value}
          mode="time"
          is24Hour={is24Hour}
          onChange={handleChangeDate}
          display={isAndroid ? "calendar" : "spinner"}
          positiveButton={{
            label: "Select",
            textColor: selectDateColor,
          }}
        />
      )}
    </VStack>
  );
};

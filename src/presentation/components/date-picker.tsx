import { HStack, Pressable, Text, useToken } from "@gluestack-ui/themed";
import { type DateTimePickerEvent } from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Platform } from "react-native";
import CalendarIcon from "src/main/assets/colorfull-icons/calendar-filled.svg";

const isAndroid = Platform.OS === "android";

interface DateTimePickerProps {
  value: Date;
  onChange: (selectedDate: Date) => void;
  is24Hour?: boolean;
}

export const DatePicker: React.FC<DateTimePickerProps> = ({
  value,
  onChange,
  is24Hour,
}: DateTimePickerProps) => {
  const selectDateColor = useToken("colors", "green400");
  const [show, setShow] = useState(false);

  const onChange2 = ({ type }: DateTimePickerEvent, selectedDate?: Date) => {
    if (type === "dismissed") return setShow(false);
    const currentDate = selectedDate;
    if (currentDate) onChange(currentDate);
    if (isAndroid) {
      setShow(false);
    }
    return undefined;
  };

  return (
    <>
      <HStack
        height="$14"
        bgColor="$violet100"
        alignItems="center"
        paddingHorizontal="$4"
      >
        <Pressable
          flex={1}
          onPress={() => setShow((prev) => !prev)}
          justifyContent="center"
        >
          <Text>{dayjs(value).format("DD/MM/YYYY")}</Text>
        </Pressable>
        <CalendarIcon />
      </HStack>
      {show && (
        <DateTimePicker
          testID="datePicker"
          minimumDate={dayjs().toDate()}
          value={value}
          mode="date"
          is24Hour={is24Hour}
          onChange={onChange2}
          display={isAndroid ? "calendar" : "spinner"}
          positiveButton={{
            label: "Select",
            textColor: selectDateColor,
          }}
        />
      )}
    </>
  );
};

import {
  FormControl,
  Input as NativeBaseInput,
  InputField,
} from "@gluestack-ui/themed";
import type { ComponentProps } from "react";
import React from "react";
import type { ColorValue } from "react-native";
import type { SvgProps } from "react-native-svg";

export interface InputProps extends ComponentProps<typeof InputField> {
  icon?: React.FC<SvgProps>;
  iconSize?: number;
  divisionColor?: ColorValue;
  errorMessage?: string;
  isInvalid?: boolean;
  placeholder?: string;
}

export const Input: React.FC<InputProps> = ({
  errorMessage,
  isInvalid = false,
  divisionColor,
  placeholder,
  ...props
}: InputProps) => {
  const invalid = !!errorMessage || isInvalid;
  return (
    <FormControl isInvalid={invalid} bg="$white" height="$12" rounded="$2xl">
      <NativeBaseInput
        flex={1}
        borderWidth={0}
        height="$full"
        borderLeftWidth={divisionColor ? "$2" : 0}
        borderLeftColor={divisionColor as string}
        isInvalid={invalid}
        justifyContent="center"
        alignItems="center"
      >
        <InputField
          height="$full"
          $focus={{
            borderWidth: "$2",
            borderColor: "$blue800",
          }}
          $invalid={{
            borderWidth: 1,
            borderColor: "$red500",
          }}
          rounded="$none"
          color="$white"
          fontFamily="$body"
          placeholder={placeholder ?? "Enter Text here"}
          fontSize="$sm"
          placeholderTextColor="$textDark600"
          {...props}
        />
      </NativeBaseInput>
    </FormControl>
  );
};

import {
  FormControl,
  Input as NativeBaseInput,
  InputField,
  InputIcon,
  useToken,
} from "@gluestack-ui/themed";
import type { ComponentProps } from "react";
import React from "react";
import type { SvgProps } from "react-native-svg";

export interface InputProps extends ComponentProps<typeof InputField> {
  icon?: React.FC<SvgProps>;
  iconSize?: number;
  divisionColor?: string;
  errorMessage?: string;
  isInvalid?: boolean;
  placeholder?: string;
}

export const Input: React.FC<InputProps> = ({
  errorMessage,
  isInvalid = false,
  divisionColor = "darkBlue500",
  placeholder,
  icon,
  ...props
}: InputProps) => {
  const caretColor = useToken("colors", divisionColor);
  const invalid = !!errorMessage || isInvalid;
  return (
    <FormControl
      isInvalid={invalid}
      bg="$white"
      height="$12"
      rounded="$2xl"
      width="$full"
    >
      <NativeBaseInput
        width="$full"
        borderWidth={0}
        height="$full"
        isInvalid={invalid}
        justifyContent="flex-start"
        alignItems="center"
        paddingLeft="$4"
      >
        {icon && <InputIcon as={icon} color="$darkBlue500" />}
        <InputField
          flex={1}
          height="$full"
          $focus={{
            borderWidth: "$0",
          }}
          $invalid={{
            borderWidth: "$1",
            borderColor: "$red500",
          }}
          cursorColor={caretColor}
          rounded="$none"
          color="$white"
          fontFamily="$body"
          placeholder={placeholder ?? "Enter Text here"}
          fontSize="$md"
          placeholderTextColor="$textDark600"
          {...props}
        />
      </NativeBaseInput>
    </FormControl>
  );
};

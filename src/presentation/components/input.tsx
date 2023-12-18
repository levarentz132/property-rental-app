import {
  FormControl,
  IInputProps,
  Input as NativeBaseInput,
} from "native-base";
import React from "react";

interface InputProps extends IInputProps {
  errorMessage?: string;
}

export const Input: React.FC<InputProps> = ({
  errorMessage,
  isInvalid,
  ...props
}: InputProps) => {
  const invalid = !!errorMessage || isInvalid;
  return (
    <FormControl isInvalid={invalid}>
      <NativeBaseInput
        bg="primary.bg.white"
        h={14}
        borderWidth={0}
        fontSize="md"
        color="white"
        fontFamily="body"
        placeholderTextColor="textColor.grayLight"
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: "red.500",
        }}
        _focus={{
          bg: "transparent",
          borderWidth: 0,
          placeholderTextColor: "gray.300",
        }}
        {...props}
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
};

import {
  Box,
  FormControl,
  IInputProps,
  Input as NativeBaseInput,
} from "native-base";
import React from "react";
import { SvgProps } from "react-native-svg";

interface InputProps extends IInputProps {
  icon?: React.FC<SvgProps>;
  errorMessage?: string;
}

export const Input: React.FC<InputProps> = ({
  errorMessage,
  isInvalid,
  icon: Icon,
  ...props
}: InputProps) => {
  const invalid = !!errorMessage || isInvalid;
  return (
    <FormControl
      isInvalid={invalid}
      bg="primary.bg.white"
      h={14}
      my={2}
      py={8}
      rounded="2xl"
    >
      <Box
        flex={1}
        flexDirection="row"
        justifyContent="start"
        alignItems="center"
        px={3}
      >
        {Icon && <Icon width={40} height={40} />}
        <NativeBaseInput
          borderWidth={0}
          flex={1}
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
      </Box>
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
};

import {
  Box,
  FormControl,
  Input as NativeBaseInput,
  InputField,
  useToken,
} from "@gluestack-ui/themed";
import type { ComponentProps } from "react";
import React from "react";
import type { ColorValue } from "react-native";
import type { SvgProps } from "react-native-svg";

interface InputProps extends ComponentProps<typeof InputField> {
  icon?: React.FC<SvgProps>;
  iconSize?: number;
  divisionColor?: ColorValue;
  errorMessage?: string;
  isInvalid?: boolean;
}

export const Input: React.FC<InputProps> = ({
  errorMessage,
  isInvalid = false,
  iconSize,
  divisionColor,
  icon: Icon,
  ...props
}: InputProps) => {
  const iconMargin = useToken("space", "4");
  const invalid = !!errorMessage || isInvalid;
  return (
    <FormControl isInvalid={invalid} bg="$white" height="$12" rounded="$2xl">
      <Box
        flex={1}
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        {Icon && (
          <Icon
            width={iconSize}
            height={iconSize}
            style={{
              marginHorizontal: iconMargin,
            }}
          />
        )}
        <NativeBaseInput
          flex={1}
          borderWidth={0}
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
            placeholder="Enter Text here"
            fontSize="$sm"
            placeholderTextColor="$textDark800"
            {...props}
          />
        </NativeBaseInput>
      </Box>
    </FormControl>
  );
};

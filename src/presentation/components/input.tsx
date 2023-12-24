import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
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
  title?: string;
  containerProps?: ComponentProps<typeof FormControl>;
}

export const Input: React.FC<InputProps> = ({
  errorMessage,
  title,
  isInvalid = false,
  divisionColor = "darkBlue500",
  placeholder,
  containerProps,
  icon,
  ...props
}: InputProps) => {
  const caretColor = useToken("colors", divisionColor);
  const invalid = !!errorMessage || isInvalid;
  return (
    <FormControl
      isInvalid={invalid}
      height="$16"
      width="$full"
      {...containerProps}
    >
      {title && (
        <FormControlLabel mb="$2">
          <FormControlLabelText
            textTransform="capitalize"
            color="$textDark800"
            fontFamily="$heading"
          >
            {title}
          </FormControlLabelText>
        </FormControlLabel>
      )}
      <NativeBaseInput
        width="$full"
        rounded="$2xl"
        bgColor="$white"
        borderWidth="$0"
        height="$full"
        isInvalid={invalid}
        justifyContent="flex-start"
        alignItems="center"
        paddingLeft={icon ? "$4" : "$0"}
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
          fontSize="$lg"
          placeholderTextColor="$textDark600"
          {...props}
        />
      </NativeBaseInput>
    </FormControl>
  );
};

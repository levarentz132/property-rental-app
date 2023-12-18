import { Button as NativeBaseButton, IButtonProps, Text } from "native-base";
import React from "react";

interface ButtonProps extends Omit<IButtonProps, "variant"> {
  title: string;
  variant?: "outline" | "solid";
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant,
  ...props
}: ButtonProps) => {
  return (
    <NativeBaseButton
      w="full"
      h={14}
      bg={variant === "outline" ? "transparent" : "primary.blue.800"}
      borderWidth={variant === "outline" ? 1 : 0}
      borderColor="primary.blue.500"
      rounded="2xl"
      _pressed={{
        bg: variant === "outline" ? "gray.500" : "primary.blue.500",
      }}
      {...props}
    >
      <Text
        color={variant === "outline" ? "primary.blue.500" : "white"}
        fontFamily="heading"
        fontSize="sm"
      >
        {title}
      </Text>
    </NativeBaseButton>
  );
};

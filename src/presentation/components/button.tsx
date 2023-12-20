import {
  Button as NativeBaseButton,
  IButtonProps,
  Text,
  useTheme,
  Box,
} from "native-base";
import React from "react";
import { SvgProps } from "react-native-svg";

interface ButtonProps extends Omit<IButtonProps, "variant"> {
  title: string;
  variant?: "outline" | "solid";
  addorment?: React.FC<SvgProps>;
  endorment?: React.FC<SvgProps>;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant,
  addorment: Addorment,
  endorment: Endorment,
  ...props
}: ButtonProps) => {
  const { space } = useTheme();
  return (
    <NativeBaseButton
      width="100%"
      h={12}
      bg={variant === "outline" ? "transparent" : "primary.blue.800"}
      borderWidth={variant === "outline" ? 1 : 0}
      borderColor="primary.blue.500"
      rounded="2xl"
      _pressed={{
        bg: variant === "outline" ? "gray.500" : "primary.blue.500",
      }}
      {...props}
    >
      <Box flexDirection="row" justifyContent="center" alignItems="center">
        {Addorment && (
          <Addorment width={30} height={30} style={{ marginRight: space[2] }} />
        )}
        <Text
          color={variant === "outline" ? "primary.blue.500" : "white"}
          fontFamily="heading"
          fontSize="md"
        >
          {title}
        </Text>
        {Endorment && (
          <Endorment width={30} height={30} style={{ marginLeft: space[2] }} />
        )}
      </Box>
    </NativeBaseButton>
  );
};

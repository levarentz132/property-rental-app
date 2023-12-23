import {
  Box,
  Button as NativeBaseButton,
  Spinner,
  Text,
  useToken,
} from "@gluestack-ui/themed";
import type { ComponentProps } from "react";
import React from "react";
import type { SvgProps } from "react-native-svg";

interface ButtonProps
  extends Omit<ComponentProps<typeof NativeBaseButton>, "variant"> {
  title: string;
  loading?: boolean;
  variant?: "outline" | "solid";
  addorment?: React.FC<SvgProps>;
  endorment?: React.FC<SvgProps>;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant,
  addorment: Addorment,
  endorment: Endorment,
  loading = false,
  ...props
}: ButtonProps) => {
  const margin = useToken("space", "2");
  return (
    <NativeBaseButton
      disabled={loading}
      width="100%"
      height="$12"
      bg={variant === "outline" ? "transparent" : "$blue800"}
      borderWidth={variant === "outline" ? 1 : 0}
      borderColor="$blue500"
      rounded="$2xl"
      $pressed-bg={variant === "outline" ? "$gray500" : "$blue500"}
      {...props}
    >
      {loading ? (
        <Spinner />
      ) : (
        <Box flexDirection="row" justifyContent="center" alignItems="center">
          {Addorment && (
            <Addorment width={30} height={30} style={{ marginRight: margin }} />
          )}
          <Text
            color={variant === "outline" ? "$blue500" : "$white"}
            fontFamily="$heading"
            fontSize="$md"
          >
            {title}
          </Text>
          {Endorment && (
            <Endorment width={30} height={30} style={{ marginLeft: margin }} />
          )}
        </Box>
      )}
    </NativeBaseButton>
  );
};

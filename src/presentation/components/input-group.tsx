import type { InputField } from "@gluestack-ui/themed";
import { Box, VStack } from "@gluestack-ui/themed";
import type { ComponentProps } from "react";
import React from "react";
import type { SvgProps } from "react-native-svg";

import { Input } from "./input";

interface InputGroupProps {
  inputs: {
    label: string;
    icon: React.FC<SvgProps>;
    inputProps?: Partial<ComponentProps<typeof InputField>>;
  }[];
}

export const InputGroup: React.FC<InputGroupProps> = ({
  inputs,
}: InputGroupProps) => {
  const total = inputs.length;
  return (
    <VStack bgColor="$white" rounded="$2xl" px="$4">
      {inputs.map(({ label, icon, inputProps }, index) => (
        <React.Fragment key={index}>
          <Input
            color="$textDark800"
            marginVertical="$4"
            icon={icon}
            key={index}
            placeholder={label}
            $focus={{
              borderWidth: 0,
            }}
            {...inputProps}
          />
          {index < total - 1 && (
            <Box width="$full" height="$0.5" bgColor="$trueGray300" />
          )}
        </React.Fragment>
      ))}
    </VStack>
  );
};

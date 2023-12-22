import type { IInputProps } from "native-base";
import { Box, HStack, VStack } from "native-base";
import React from "react";
import type { SvgProps } from "react-native-svg";

import { Input } from "./input";

interface InputGroupProps {
  inputs: {
    label: string;
    icon: React.FC<SvgProps>;
    inputProps?: Partial<IInputProps>;
  }[];
}

export const InputGroup: React.FC<InputGroupProps> = ({
  inputs,
}: InputGroupProps) => {
  const total = inputs.length;
  return (
    <VStack
      width="full"
      bgColor="primary.bg.white"
      rounded="2xl"
      px={4}
      alignItems="center"
      justifyContent="center"
    >
      {inputs.map(({ label, icon: Icon, inputProps }, index) => (
        <React.Fragment key={index}>
          <HStack alignItems="center" p={2}>
            <Input
              color="textColor.dark"
              InputLeftElement={<Icon width={40} height={40} />}
              key={index}
              placeholder={label}
              {...inputProps}
            />
          </HStack>
          {index < total - 1 && (
            <Box width="full" height={0.4} bgColor="textColor.grayDark" />
          )}
        </React.Fragment>
      ))}
    </VStack>
  );
};

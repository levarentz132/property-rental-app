import { Center, Spinner } from "@gluestack-ui/themed";
import type { ComponentProps } from "react";
import React from "react";

interface LoadingProps extends ComponentProps<typeof Center> {}

export const Loading: React.FC<LoadingProps> = ({ ...props }: LoadingProps) => (
  <Center flex={1} bg="$white" {...props}>
    <Spinner />
  </Center>
);

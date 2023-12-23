import { Center, Spinner } from "@gluestack-ui/themed";
import React from "react";

export const Loading: React.FC = () => (
  <Center flex={1} bg="$white">
    <Spinner />
  </Center>
);

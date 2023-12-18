import { Center, Spinner } from "native-base";
import React from "react";

export const Loading: React.FC = () => {
  return (
    <Center flex={1} bg="primary.bg.light">
      <Spinner />
    </Center>
  );
};

import { HStack, VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { PropsWithChildren, useCallback } from "react";

interface WrapperProps extends PropsWithChildren {
  direction?: "row" | "column";
  safe?: boolean;
}

export const Wrapper: React.FC<WrapperProps> = ({
  direction = "column",
  safe = false,
  children,
}: WrapperProps) => {
  const Wrapper = direction === "row" ? HStack : VStack;
  const SafeWrapper = useCallback(
    ({ children }: PropsWithChildren) => {
      if (safe) {
        return <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>;
      }
      return <>{children}</>;
    },
    [safe],
  );
  return (
    <SafeWrapper>
      <Wrapper>{children}</Wrapper>
    </SafeWrapper>
  );
};

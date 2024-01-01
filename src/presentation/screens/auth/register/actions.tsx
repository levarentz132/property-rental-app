import type { HStack } from "@gluestack-ui/themed";
import { VStack } from "@gluestack-ui/themed";
import type { ComponentProps } from "react";
import React from "react";
import { Button } from "src/presentation/components";

interface ActionsPageProps extends ComponentProps<typeof HStack> {
  loading?: boolean;
  onRegister: () => void;
  onGoBack: () => void;
}

export const Actions: React.FC<ActionsPageProps> = ({
  onRegister,
  onGoBack,
  loading = false,
  ...props
}: ActionsPageProps) => (
  <VStack flex={1} width="$full" {...props}>
    <Button
      minHeight="$16"
      title="Create account"
      loading={loading}
      onPress={onRegister}
    />
    <Button
      marginTop="$4"
      title="Go back to login"
      variant="outline"
      loading={loading}
      onPress={onGoBack}
    />
  </VStack>
);

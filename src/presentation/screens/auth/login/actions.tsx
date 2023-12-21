import { HStack, IStackProps, Text } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";

import { Button } from "src/presentation/components";

interface ActionsPageProps extends IStackProps {
  loading?: boolean;
  onForgotPassword: () => void;
  onLogin: () => void;
}

export const Actions: React.FC<ActionsPageProps> = ({
  onForgotPassword,
  onLogin,
  loading = false,
  ...props
}: ActionsPageProps) => {
  return (
    <HStack flex={1} alignItems="center" {...props}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={{ flex: 1 }}
        onPress={onForgotPassword}
      >
        <Text fontSize={14} color="textColor.grayDark">
          Forgot password?
        </Text>
      </TouchableOpacity>
      <Button flex={1} title="Login" loading={loading} onPress={onLogin} />
    </HStack>
  );
};

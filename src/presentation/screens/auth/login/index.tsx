import { Box, Heading, VStack } from "native-base";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Actions } from "./actions";
import { Social } from "./social";
import passwordIcon from "../../../../main/assets/colorfull-icons/password.svg";
import userIcon from "../../../../main/assets/colorfull-icons/user.svg";
import Logo from "../../../../main/assets/logo.svg";
import { InputGroup } from "../../../components/input-group";

export const Login: React.FC = (): JSX.Element => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const handleLogin = () => {};
  const handleForgotPassword = () => {};
  return (
    <VStack
      flex={1}
      bgColor="primary.blue.800"
      justifyContent="center"
      alignItems="center"
    >
      <Box flex={1} justifyContent="center" alignItems="center">
        <Logo width={150} height={150} />
      </Box>

      <VStack
        bgColor="primary.bg.light"
        width="full"
        borderTopRightRadius="3xl"
        borderTopLeftRadius="3xl"
        alignItems="center"
        justifyContent="flex-end"
        padding={6}
      >
        <Heading
          color="textColor.dark"
          fontFamily="heading"
          fontSize="3xl"
          marginTop={6}
          marginBottom={12}
        >
          Login
        </Heading>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%" }}
        >
          <InputGroup
            inputs={[
              {
                label: "Username",
                icon: userIcon,
                inputProps: { value: username, onChangeText: setUsername },
              },
              {
                label: "Password",
                icon: passwordIcon,
                inputProps: { value: password, onChangeText: setPassword },
              },
            ]}
          />
          <Actions
            marginTop={8}
            onLogin={handleLogin}
            onForgotPassword={handleForgotPassword}
          />
          <Social marginTop={24} paddingX={8} />
        </KeyboardAwareScrollView>
      </VStack>
    </VStack>
  );
};

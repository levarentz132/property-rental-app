import { Box, Heading, VStack } from "native-base";
import React, { useState } from "react";
import { StatusBar } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import EmailIcon from "src/main/assets/colorfull-icons/email.svg";
import PasswordIcon from "src/main/assets/colorfull-icons/password.svg";
import UserIcon from "src/main/assets/colorfull-icons/user.svg";
import { Button, Input } from "src/presentation/components";

import { Social } from "../social";

export const Register: React.FC = (): JSX.Element => {
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <VStack
        flex={1}
        bgColor="primary.blue.800"
        justifyContent="center"
        alignItems="center"
      >
        <Box flex={1} />
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
            Register
          </Heading>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            style={{ width: "100%" }}
          >
            <Input
              placeholder="Username"
              my={2}
              value={username}
              onChangeText={setUsername}
              icon={UserIcon}
            />
            <Input
              placeholder="E-mail"
              my={2}
              value={email}
              onChangeText={setEmail}
              icon={EmailIcon}
            />
            <Input
              placeholder="Password"
              my={2}
              value={password}
              onChangeText={setPassword}
              icon={PasswordIcon}
            />
            <Button flex={1} title="Register" marginTop={20} />
            <Social marginTop={12} paddingX={8} />
          </KeyboardAwareScrollView>
        </VStack>
      </VStack>
    </>
  );
};

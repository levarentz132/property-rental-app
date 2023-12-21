import { Box, Heading, VStack, useTheme, useToast } from "native-base";
import React, { useState } from "react";
import { StatusBar } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import PasswordIcon from "src/main/assets/colorfull-icons/password.svg";
import UserIcon from "src/main/assets/colorfull-icons/user.svg";
import Logo from "src/main/assets/logo.svg";
import { InputGroup } from "src/presentation/components";

import { HttpPostClient } from "src/data/contracts/infra";
import { env } from "src/main/config/env";
import { useApp } from "src/presentation/hooks/use-app";
import { Social } from "../social";
import { Actions } from "./actions";
import { isAxiosError } from "axios";

interface LoginProps {
  httpClient: HttpPostClient;
}

export const Login: React.FC<LoginProps> = ({
  httpClient,
}: LoginProps): JSX.Element => {
  const { addUser } = useApp();
  const toast = useToast();
  const { colors } = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const handleLogin = async () => {
    try {
      setLoading(true);
      const { body } = await httpClient.post<any>({
        url: `${env.ENDPOINT}/signin`,
        body: {
          username,
          password,
        },
      });
      await addUser({
        username: body.user.username,
        realName: body.user.real_name,
        bookmarks: body.user.bookmarks,
      });
    } catch (error) {
      if (isAxiosError(error)) {
        const errorData = error.toJSON() as any;
        console.log(errorData.status);
        if (errorData.status === 401) {
          toast.show({
            title: "Invalid credentials",
            description:
              error.response?.data.message ||
              "Please check your username and password",
            placement: "top",
            bgColor: colors.red[500],
            alignItems: "center",
            margin: 4,
          });
        }
        console.log(error.response?.data);
      }
    } finally {
      setLoading(false);
    }
  };
  const handleForgotPassword = () => {};
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
                  icon: UserIcon,
                  inputProps: {
                    isDisabled: loading,
                    value: username,
                    onChangeText: setUsername,
                    type: "text",
                    autoCorrect: false,
                  },
                },
                {
                  label: "Password",
                  icon: PasswordIcon,
                  inputProps: {
                    isDisabled: loading,
                    value: password,
                    onChangeText: setPassword,
                    type: "password",
                  },
                },
              ]}
            />
            <Actions
              loading={loading}
              marginTop={8}
              onLogin={handleLogin}
              onForgotPassword={handleForgotPassword}
            />
            <Social marginTop={24} paddingX={8} />
          </KeyboardAwareScrollView>
        </VStack>
      </VStack>
    </>
  );
};

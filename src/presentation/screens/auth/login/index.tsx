import { Box, Heading, useToast, VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { isAxiosError } from "axios";
import React, { useState } from "react";
import { Alert } from "react-native";
import { KeyboardAvoidingView, Platform } from "react-native";
import type { HttpPostClient } from "src/data/contracts/infra";
import PasswordIcon from "src/main/assets/colorfull-icons/password.svg";
import UserIcon from "src/main/assets/colorfull-icons/user.svg";
import Logo from "src/main/assets/logo.svg";
import { env } from "src/main/config/env";
import type { AuthNavigatorRouteProps } from "src/main/routes/auth.routes";
import { InputGroup } from "src/presentation/components";
import { errorToast } from "src/presentation/helpers/toasts";
import { useApp } from "src/presentation/hooks/use-app";
import { StaticVerticalLayout } from "src/presentation/layout";

import { Actions } from "./actions";

interface LoginProps {
  httpClient: HttpPostClient;
}
export const Login: React.FC<LoginProps> = ({
  httpClient,
}: LoginProps): JSX.Element => {
  const { addUser } = useApp();
  const { navigate } = useNavigation<AuthNavigatorRouteProps>();
  const toast = useToast();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

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
        id: body.user.id,
        username: body.user.username,
        realName: body.user.realName,
        bookmarks: body.user.bookmarks,
        userRole: body.user.userRole,
        profilePicture: body.user.profilePicture,
      });
    } catch (error) {
      if (isAxiosError(error)) {
        const errorData = error.toJSON() as any;
        if (errorData.status === 401) {
          toast.closeAll();
          toast.show(
            errorToast({
              title: "Invalid credentials",
              message: "Please check your username and password.",
              marginTop: "$14",
            }),
          );
        }
      }
    } finally {
      setLoading(false);
    }
  };
  const handleForgotPassword = () => {};

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <VStack flex={1} marginBottom="$12">
        <Box
          flex={1}
          bgColor="$blue800"
          justifyContent="center"
          alignItems="center"
        >
          <Logo width={150} height={150} />
        </Box>
        <StaticVerticalLayout
          fullWith
          bgColor="white"
          vStackProps={{
            bgColor: "$blue800",
            paddingHorizontal: "$0",
            paddingTop: "$0",
            space: undefined,
          }}
        >
          <VStack
            flex={1}
            bgColor="$white"
            borderTopRightRadius="$3xl"
            borderTopLeftRadius="$3xl"
            alignItems="center"
            justifyContent="flex-start"
            paddingHorizontal="$6"
          >
            <Heading
              color="$textDark800"
              fontFamily="$heading"
              fontSize="$2xl"
              marginTop="$6"
              marginBottom="$12"
            >
              Login 123W
            </Heading>
            <InputGroup
              inputs={[
                {
                  label: "Username",
                  icon: UserIcon,
                  inputProps: {
                    borderWidth: 0,
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
                    value: password,
                    onChangeText: setPassword,
                    type: "password",
                  },
                },
              ]}
            />
            <Actions
              loading={loading}
              marginTop="$8"
              onLogin={handleLogin}
              onForgotPassword={handleForgotPassword}
              onRegister={() => navigate("sign-up")}
            />
          </VStack>
        </StaticVerticalLayout>
      </VStack>
    </KeyboardAvoidingView>
  );
};

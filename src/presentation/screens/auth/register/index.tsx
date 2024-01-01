import { Box, Heading, useToast, VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import EmailIcon from "src/main/assets/colorfull-icons/email.svg";
import PasswordIcon from "src/main/assets/colorfull-icons/password.svg";
import UserIcon from "src/main/assets/colorfull-icons/user.svg";
import Logo from "src/main/assets/logo.svg";
import type { AuthNavigatorRouteProps } from "src/main/routes/auth.routes";
import { Input } from "src/presentation/components";
import { errorToast } from "src/presentation/helpers/toasts";
import { StaticVerticalLayout } from "src/presentation/layout";

import { Actions } from "./actions";

export const Register: React.FC = (): JSX.Element => {
  const { goBack } = useNavigation<AuthNavigatorRouteProps>();
  const toast = useToast();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [email, setEmail] = useState<string>();

  const toastError = () => {
    toast.closeAll();
    toast.show(
      errorToast({
        message: "Feature not implemented yet",
      }),
    );
  };

  const handleRegister = async () => {
    toastError();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <VStack flex={1}>
        <Box
          flex={0.7}
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
              Register
            </Heading>
            <Input
              placeholder="Username"
              my="$2"
              value={username}
              onChangeText={setUsername}
              icon={UserIcon}
            />
            <Input
              placeholder="E-mail"
              my="$2"
              value={email}
              onChangeText={setEmail}
              icon={EmailIcon}
            />
            <Input
              placeholder="Password"
              my="$2"
              value={password}
              onChangeText={setPassword}
              icon={PasswordIcon}
            />
            <Actions
              marginTop="$8"
              onRegister={handleRegister}
              onGoBack={goBack}
            />
          </VStack>
        </StaticVerticalLayout>
      </VStack>
    </KeyboardAvoidingView>
  );
};

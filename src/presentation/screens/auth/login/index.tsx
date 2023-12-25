import { Box, Heading, useToast, useToken, VStack } from "@gluestack-ui/themed";
import { isAxiosError } from "axios";
import React, { useState } from "react";
import { Dimensions, SafeAreaView, StatusBar } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import type { HttpPostClient } from "src/data/contracts/infra";
import PasswordIcon from "src/main/assets/colorfull-icons/password.svg";
import UserIcon from "src/main/assets/colorfull-icons/user.svg";
import Logo from "src/main/assets/logo.svg";
import { env } from "src/main/config/env";
import { InputGroup } from "src/presentation/components";
import { errorToast } from "src/presentation/helpers/toasts";
import { useApp } from "src/presentation/hooks/use-app";

import { Social } from "../social";
import { Actions } from "./actions";

const AnimatedBox = Animated.createAnimatedComponent(Box);

const SCREEN_HEIGHT = Dimensions.get("window").height;

interface LoginProps {
  httpClient: HttpPostClient;
}
export const Login: React.FC<LoginProps> = ({
  httpClient,
}: LoginProps): JSX.Element => {
  const { addUser } = useApp();
  const toast = useToast();
  const backgroundColor = useToken("colors", "blue800");
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const headerHeight = useSharedValue(SCREEN_HEIGHT / 2);
  const boxStyle = useAnimatedStyle(() => ({
    height: headerHeight.value,
  }));
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
        realName: body.user.real_name,
        bookmarks: body.user.bookmarks,
        userRole: body.user.user_role,
        profilePicture: body.user.profile_picture,
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
    <SafeAreaView>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor }}
        onKeyboardWillShow={() => {
          headerHeight.value = withTiming(SCREEN_HEIGHT / 4);
        }}
        onKeyboardWillHide={() => {
          headerHeight.value = withTiming(SCREEN_HEIGHT / 2);
        }}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <AnimatedBox
          style={[boxStyle]}
          bgColor="$blue800"
          justifyContent="center"
          alignItems="center"
        >
          <Logo width={150} height={150} />
        </AnimatedBox>
        <VStack
          bgColor="$white"
          width="$full"
          borderTopRightRadius="$3xl"
          borderTopLeftRadius="$3xl"
          alignItems="center"
          justifyContent="flex-end"
          padding="$6"
        >
          <Heading
            color="$textDark800"
            fontFamily="$heading"
            fontSize="$2xl"
            marginTop="$6"
            marginBottom="$12"
          >
            Login
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
          />
          <Social marginTop="$24" paddingHorizontal="$8" />
        </VStack>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

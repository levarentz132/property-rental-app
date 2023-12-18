import { Box, HStack, Heading, Text, VStack } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import passwordIcon from "../../../main/assets/colorfull-icons/password.svg";
import userIcon from "../../../main/assets/colorfull-icons/user.svg";
import Logo from "../../../main/assets/logo.svg";
import { Button } from "../../components/button";
import { InputGroup } from "../../components/input-group";

export const Login: React.FC = (): JSX.Element => {
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
        flex={1}
        width="full"
        borderTopRightRadius={50}
        borderTopLeftRadius={50}
        alignItems="center"
        paddingTop={12}
        paddingX={6}
        paddingBottom={8}
      >
        <Heading
          color="textColor.dark"
          fontFamily="heading"
          fontSize="3xl"
          marginBottom={10}
        >
          Login
        </Heading>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, width: "100%" }}
        >
          <InputGroup
            inputs={[
              { label: "Username", icon: userIcon },
              { label: "Password", icon: passwordIcon },
            ]}
          />
          <HStack flex={1} alignItems="center" mt={8}>
            <TouchableOpacity activeOpacity={0.7} style={{ flex: 1 }}>
              <Text fontSize={14} color="textColor.grayDark">
                Forgot password?
              </Text>
            </TouchableOpacity>
            <Button flex={1} title="Login" />
          </HStack>
        </KeyboardAwareScrollView>
      </VStack>
    </VStack>
  );
};

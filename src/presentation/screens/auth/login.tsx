import { Heading, Text, VStack } from "native-base";
import React from "react";
import { InputGroup } from "../../components/input-group";
import userIcon from "../../../main/assets/colorfull-icons/user.svg";
import passwordIcon from "../../../main/assets/colorfull-icons/password.svg";

export const Login: React.FC = () => {
  return (
    <VStack flex={1} bgColor="primary.blue.800">
      <Text color="stateColor.success" flex={1}>
        LoginPage
      </Text>
      <VStack
        bgColor="primary.bg.light"
        flex={1}
        width="full"
        borderTopRightRadius={50}
        borderTopLeftRadius={50}
        justifyContent="start"
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
        <InputGroup
          inputs={[
            { label: "Username", icon: userIcon },
            { label: "Password", icon: passwordIcon },
          ]}
        />
      </VStack>
    </VStack>
  );
};

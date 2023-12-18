import { HStack, Pressable, IStackProps } from "native-base";
import React from "react";

import AppleIcon from "../../../../main/assets/brands/apple.svg";
import FacebookIcon from "../../../../main/assets/brands/facebook.svg";
import GoogleIcon from "../../../../main/assets/brands/google.svg";

interface SocialPageProps extends IStackProps {}

export const Social: React.FC<SocialPageProps> = ({
  ...props
}: SocialPageProps) => {
  return (
    <HStack
      alignItems="center"
      justifyContent="space-between"
      width="full"
      {...props}
    >
      <Pressable
        alignItems="center"
        justifyContent="center"
        padding={4}
        backgroundColor="primary.bg.white"
        rounded="full"
      >
        <FacebookIcon width={35} height={35} />
      </Pressable>

      <Pressable
        alignItems="center"
        justifyContent="center"
        padding={4}
        backgroundColor="primary.bg.white"
        rounded="full"
      >
        <GoogleIcon width={35} height={35} />
      </Pressable>
      <Pressable
        alignItems="center"
        justifyContent="center"
        padding={4}
        backgroundColor="primary.bg.white"
        rounded="full"
      >
        <AppleIcon width={35} height={35} />
      </Pressable>
    </HStack>
  );
};

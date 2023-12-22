import { Center, Pressable, Text, useToken } from "@gluestack-ui/themed";
import type { ComponentProps } from "react";
import type { SvgProps } from "react-native-svg";

interface CardButtonProps extends ComponentProps<typeof Pressable> {
  label: string;
  icon: React.FC<SvgProps>;
}

export const CardButton: React.FC<CardButtonProps> = ({
  label,
  icon: Icon,
  ...props
}: CardButtonProps) => {
  const iconSize = useToken("space", "7");
  return (
    <Pressable width="$24" height="$24" rounded="$2xl" {...props}>
      <Center flex={1}>
        <Icon width={iconSize} height={iconSize} />
        <Text
          textTransform="capitalize"
          fontSize="$xs"
          color="$textDark800"
          marginTop={2}
        >
          {label}
        </Text>
      </Center>
    </Pressable>
  );
};

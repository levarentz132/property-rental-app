import { Center, Pressable, Text, useTheme } from "native-base";
import type { InterfacePressableProps } from "native-base/lib/typescript/components/primitives/Pressable/types";
import type { SvgProps } from "react-native-svg";

interface CardButtonProps extends InterfacePressableProps {
  label: string;
  icon: React.FC<SvgProps>;
}

export const CardButton: React.FC<CardButtonProps> = ({
  label,
  icon: Icon,
  ...props
}: CardButtonProps) => {
  const { sizes } = useTheme();
  return (
    <Pressable w={sizes[6]} h={sizes[6]} rounded="2xl" {...props}>
      <Center flex={1}>
        <Icon width={sizes[7]} height={sizes[7]} />
        <Text
          textTransform="capitalize"
          fontSize="xs"
          color="textColor.dark"
          marginTop={1}
        >
          {label}
        </Text>
      </Center>
    </Pressable>
  );
};

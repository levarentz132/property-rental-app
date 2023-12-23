import { HStack, Text, useToken, VStack } from "@gluestack-ui/themed";
import type { TouchableOpacityProps } from "react-native";
import { TouchableOpacity } from "react-native";
import type { SvgProps } from "react-native-svg";
import ArrowRight from "src/main/assets/outline-icons/arrow-right2.svg";

interface CardProps extends TouchableOpacityProps {
  label: string;
  icon: React.FC<SvgProps>;
  hideArrow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  label,
  icon: Icon,
  hideArrow = false,
  ...props
}: CardProps): JSX.Element => {
  const sizes = useToken("space", "10");
  return (
    <TouchableOpacity activeOpacity={0.7} {...props}>
      <HStack
        width="$full"
        minHeight="$14"
        rounded="$2xl"
        padding="$3"
        alignItems="center"
        justifyContent="center"
      >
        <Icon width={sizes} height={sizes} />
        <HStack
          flex={1}
          justifyContent="space-between"
          alignItems="center"
          marginLeft="$3"
        >
          <VStack flex={1}>
            <Text fontSize="$md" textTransform="capitalize">
              {label}
            </Text>
          </VStack>
          {!hideArrow && <ArrowRight width={20} height={20} />}
        </HStack>
      </HStack>
    </TouchableOpacity>
  );
};

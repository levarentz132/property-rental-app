import { IPressableProps, Pressable, Text } from "native-base";
import { ColorType } from "native-base/lib/typescript/components/types";
import React from "react";
import { Category } from "../screens/app";

interface GroupProps extends IPressableProps {
  category: Category;
  active?: boolean;
  color: ColorType;
  onSelect: (category: Category) => void;
}

export const Group: React.FC<GroupProps> = ({
  category,
  color,
  active = false,
  ...props
}: GroupProps) => {
  return (
    <Pressable
      mr={3}
      h={10}
      bg={active ? color : "transparent"}
      rounded="md"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      onPress={() => props.onSelect(category)}
      isPressed={active}
      {...props}
    >
      <Text
        color={active ? "textColor.white" : color}
        textTransform="capitalize"
        fontSize="lg"
        fontWeight="bold"
      >
        {category}
      </Text>
    </Pressable>
  );
};

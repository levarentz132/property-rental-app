import { Heading, HStack, useToken } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import ArrowBackIcon from "src/main/assets/outline-icons/arrow-left2.svg";
import { Button, Input } from "src/presentation/components";
import { StaticVerticalScrollableLayout } from "src/presentation/layout";

export const ChangePassword: React.FC = () => {
  const inputMarginBottom = useToken("space", "8");
  const marginRightGoBack = useToken("space", "4");
  const iconSize = useToken("space", "7");
  const iconColor = useToken("colors", "blue800");
  const { goBack } = useNavigation();
  const containerProps = { style: { marginBottom: inputMarginBottom } };

  return (
    <StaticVerticalScrollableLayout>
      <HStack marginBottom="$3" alignItems="center">
        <TouchableOpacity
          style={{ marginRight: marginRightGoBack }}
          activeOpacity={0.7}
          onPress={goBack}
        >
          <ArrowBackIcon width={iconSize} height={iconSize} fill={iconColor} />
        </TouchableOpacity>
        <Heading flex={1} textTransform="capitalize">
          Change Password
        </Heading>
      </HStack>
      <Input
        title="Current password"
        placeholder="******"
        containerProps={containerProps}
      />
      <Input
        title="New password"
        placeholder="New password"
        containerProps={containerProps}
      />
      <Input
        title="Confirm New password"
        placeholder="New password"
        containerProps={containerProps}
      />
      <Button title="Change Password" marginBottom="$4" />
    </StaticVerticalScrollableLayout>
  );
};

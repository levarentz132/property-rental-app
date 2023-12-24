import {
  Heading,
  HStack,
  ScrollView,
  useToken,
  VStack,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ArrowBackIcon from "src/main/assets/outline-icons/arrow-left2.svg";
import { Button, Input } from "src/presentation/components";

export const ChangePassword: React.FC = () => {
  const backgroundColor = useToken("colors", "backgroundApp");
  const inputMarginBottom = useToken("space", "8");
  const iconSize = useToken("space", "7");
  const iconColor = useToken("colors", "blue800");
  const { goBack } = useNavigation();
  const containerProps = { style: { marginBottom: inputMarginBottom } };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <ScrollView>
        <VStack flex={1} padding="$6" space="lg">
          <HStack marginBottom="$3" alignItems="center">
            <TouchableOpacity
              style={{ marginRight: 4 }}
              activeOpacity={0.7}
              onPress={goBack}
            >
              <ArrowBackIcon
                width={iconSize}
                height={iconSize}
                fill={iconColor}
              />
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
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

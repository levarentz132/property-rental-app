import { useNavigation } from "@react-navigation/native";
import PasswordIcon from "src/main/assets/colorfull-icons/key.svg";
import LogOutIcon from "src/main/assets/colorfull-icons/logout.svg";
import ShieldIcon from "src/main/assets/colorfull-icons/shield.svg";
import UserIcon from "src/main/assets/colorfull-icons/user.svg";
import type { StackNavigatorSettingsRouteProps } from "src/main/routes/stack-settings-navigator";
import { useApp } from "src/presentation/hooks/use-app";
import { StaticVerticalScrollableLayout } from "src/presentation/layout";

import { Card } from "./card";

export const Settings: React.FC = (): JSX.Element => {
  const { removeUser } = useApp();
  const { navigate } = useNavigation<StackNavigatorSettingsRouteProps>();
  return (
    <StaticVerticalScrollableLayout title="Settings">
      <Card
        icon={UserIcon}
        label="Personal profile"
        onPress={() => navigate("personal-profile")}
      />
      <Card
        icon={PasswordIcon}
        label="Change password"
        onPress={() => navigate("change-password")}
      />
      <Card
        icon={ShieldIcon}
        label="Privacy policy"
        onPress={() => navigate("privacy-policy")}
      />
      <Card hideArrow icon={LogOutIcon} label="Log out" onPress={removeUser} />
    </StaticVerticalScrollableLayout>
  );
};

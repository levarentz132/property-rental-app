import { useNavigation } from "@react-navigation/native";
import DocsIcon from "src/main/assets/colorfull-icons/docs.svg";
import PasswordIcon from "src/main/assets/colorfull-icons/key.svg";
import LogOutIcon from "src/main/assets/colorfull-icons/logout.svg";
import NotificationIcon from "src/main/assets/colorfull-icons/notification.svg";
import ShieldIcon from "src/main/assets/colorfull-icons/shield.svg";
import UserIcon from "src/main/assets/colorfull-icons/user.svg";
import { useApp } from "src/presentation/hooks/use-app";
import { StaticVerticalScrollableLayout } from "src/presentation/layout";

import { Card } from "./card";

export const Settings: React.FC = (): JSX.Element => {
  const { removeUser } = useApp();
  const { navigate } = useNavigation();
  return (
    <StaticVerticalScrollableLayout title="Settings">
      <Card icon={UserIcon} label="Personal profile" />
      <Card
        icon={PasswordIcon}
        label="Change password"
        onPress={() => navigate("change-password")}
      />
      <Card icon={ShieldIcon} label="Privacy policy" />
      <Card icon={DocsIcon} label="Data saver" />
      <Card icon={NotificationIcon} label="Notification" />
      <Card hideArrow icon={LogOutIcon} label="Log out" onPress={removeUser} />
    </StaticVerticalScrollableLayout>
  );
};

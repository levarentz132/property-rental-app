import { useToken } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { Button, Input } from "src/presentation/components";
import { StaticVerticalScrollableLayout } from "src/presentation/layout";

export const ChangePassword: React.FC = () => {
  const inputMarginBottom = useToken("space", "8");
  const { goBack } = useNavigation();
  const containerProps = { style: { marginBottom: inputMarginBottom } };

  return (
    <StaticVerticalScrollableLayout title="Change Password" onGoBack={goBack}>
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
      <Button title="Change Password" marginTop="$4" />
    </StaticVerticalScrollableLayout>
  );
};

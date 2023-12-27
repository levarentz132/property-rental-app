import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Center,
  useToken,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { Button, Input } from "src/presentation/components";
import { useApp } from "src/presentation/hooks/use-app";
import { StaticVerticalScrollableLayout } from "src/presentation/layout";

export const PersonalProfile: React.FC = () => {
  const { user } = useApp();
  const { goBack } = useNavigation();
  const inputMarginBottom = useToken("space", "8");
  const containerProps = { style: { marginBottom: inputMarginBottom } };

  return (
    <StaticVerticalScrollableLayout title="Personal Profile" onGoBack={goBack}>
      <Center>
        <Avatar size="2xl" bgColor="$indigo600" rounded="$2xl" marginRight="$4">
          <AvatarFallbackText>Ronald Richards</AvatarFallbackText>
          <AvatarImage
            rounded="$2xl"
            alt="User profile picture"
            source={{ uri: user?.profilePicture }}
          />
        </Avatar>
      </Center>
      <Input
        title="Username"
        placeholder={user?.username}
        containerProps={{ ...containerProps, isDisabled: true }}
      />
      <Input
        title="Real Name"
        placeholder={user?.realName}
        containerProps={containerProps}
      />
      <Input
        title="Role"
        placeholder={user?.userRole}
        containerProps={containerProps}
      />
      <Button title="Update" marginTop="$4" />
    </StaticVerticalScrollableLayout>
  );
};

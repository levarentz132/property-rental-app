import { HStack, Pressable, VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import type { UserData } from "src/domain/models";
import CallIcon from "src/main/assets/colorfull-icons/call.svg";
import MessagesIcon from "src/main/assets/colorfull-icons/messages.svg";
import ScheduleIcon from "src/main/assets/colorfull-icons/schedule.svg";
import { CardButton } from "src/presentation/components";
import { UserSignature } from "src/presentation/components/user-signature";

interface OwnerCardProps {
  owner: UserData;
  onSchedulePress: () => void;
}

export const OwnerCard: React.FC<OwnerCardProps> = ({
  owner,
  onSchedulePress,
}: OwnerCardProps): JSX.Element => {
  const { navigate } = useNavigation();
  const handleGoToOwnerProfile = () => {
    navigate("owner-profile", {
      id: owner.id,
    });
  };
  return (
    <VStack
      flex={1}
      padding="$4"
      rounded="$3xl"
      bgColor="$white"
      softShadow="1"
    >
      <Pressable onPress={handleGoToOwnerProfile}>
        <UserSignature
          marginBottom="$5"
          name={owner.realName}
          suffix="Owner"
          userRole={owner.userRole}
          uri={owner.profilePicture}
        />
      </Pressable>
      <HStack space="lg" justifyContent="space-between">
        <CardButton
          flex={1}
          icon={MessagesIcon}
          bgColor="$blue100"
          label="Message"
        />
        <CardButton
          flex={1}
          icon={ScheduleIcon}
          bgColor="$orange100"
          label="Schedule"
          onPress={onSchedulePress}
        />
        <CardButton flex={1} icon={CallIcon} bgColor="$green100" label="Call" />
      </HStack>
    </VStack>
  );
};

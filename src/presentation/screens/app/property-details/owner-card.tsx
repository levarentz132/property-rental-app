import { HStack, VStack } from "@gluestack-ui/themed";
import CallIcon from "src/main/assets/colorfull-icons/call.svg";
import MessagesIcon from "src/main/assets/colorfull-icons/messages.svg";
import ScheduleIcon from "src/main/assets/colorfull-icons/schedule.svg";
import { CardButton } from "src/presentation/components";
import { UserSignature } from "src/presentation/components/user-signature";
import { useApp } from "src/presentation/hooks/use-app";

interface OwnerCardProps {
  onSchedulePress: () => void;
}

export const OwnerCard: React.FC<OwnerCardProps> = ({
  onSchedulePress,
}: OwnerCardProps): JSX.Element => {
  const { user } = useApp();
  return (
    <VStack
      flex={1}
      padding="$4"
      rounded="$3xl"
      bgColor="$white"
      shadowRadius="$2"
      shadowColor="primary.bg.black"
      shadowOffset={{ width: 0, height: 5 }}
      shadowOpacity={0.1}
    >
      <UserSignature
        marginBottom="$5"
        name={user!.realName}
        userRole="Home Owner/Broker"
        uri={`https://github.com/${user!.username}.png`}
      />
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

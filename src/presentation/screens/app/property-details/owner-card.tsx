import { HStack, VStack } from "native-base";
import { UserSignature } from "src/presentation/components/user-signature";

import CallIcon from "src/main/assets/colorfull-icons/call.svg";
import MessagesIcon from "src/main/assets/colorfull-icons/messages.svg";
import ScheduleIcon from "src/main/assets/colorfull-icons/schedule.svg";

import { CardButton } from "src/presentation/components";
import { useApp } from "src/presentation/hooks/use-app";

export const OwnerCard: React.FC = (): JSX.Element => {
  const { user } = useApp();
  return (
    <VStack
      flex={1}
      shadow={9}
      padding={4}
      rounded="3xl"
      bgColor="primary.bg.white"
    >
      <UserSignature
        marginBottom={5}
        name={user!.realName}
        userRole="Home Owner/Broker"
        uri={`https://github.com/${user!.username}.png`}
      />
      <HStack space={4} justifyContent="space-between">
        <CardButton
          flex={1}
          icon={MessagesIcon}
          bgColor="primary.blue.100"
          label="Message"
        />
        <CardButton
          flex={1}
          icon={ScheduleIcon}
          bgColor="primary.orange.100"
          label="Schedule"
        />
        <CardButton
          flex={1}
          icon={CallIcon}
          bgColor="primary.green.100"
          label="Call"
        />
      </HStack>
    </VStack>
  );
};

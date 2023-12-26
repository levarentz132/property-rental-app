import { Heading, Text } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { StaticVerticalScrollableLayout } from "src/presentation/layout";

export const PrivacyPolicy: React.FC = () => {
  const { goBack } = useNavigation();

  return (
    <StaticVerticalScrollableLayout title="Privacy Policy" onGoBack={goBack}>
      <Heading>Our Privacy Policy</Heading>
      <Text>
        A terms and conditions agreement outlines the website
        administrator&apos;s rules regarding user behavior, and provides
        information about the actions the website administrator can and will
        perform.
      </Text>
    </StaticVerticalScrollableLayout>
  );
};

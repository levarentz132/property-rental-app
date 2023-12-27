import {
  ChangePassword,
  PersonalProfile,
  PrivacyPolicy,
  Settings,
} from "src/presentation/screens/app";

export const settingsFactory = () => <Settings />;

export const changePasswordFactory = () => <ChangePassword />;
export const privacyPolicyFactory = () => <PrivacyPolicy />;
export const personalProfileFactory = () => <PersonalProfile />;

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      favorites: undefined;
      home: undefined;
      menu: undefined;
      messages: undefined;
      settings: undefined;
      "change-password": undefined;
      "property-details": {
        type: "property" | "featured";
        id: string;
      };
      "sign-in": undefined;
      "sign-up": undefined;
      "owner-profile": {
        id: string;
      };
    }
  }
}

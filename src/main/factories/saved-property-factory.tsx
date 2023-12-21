import { AxiosHttpClient } from "src/infra/http/axios-client";
import { SavedProperty } from "src/presentation/screens/app";

export const savedPropertyFactory = () => {
  const httpClient = new AxiosHttpClient();
  return <SavedProperty httpClient={httpClient} />;
};

import { AxiosHttpClient } from "src/infra/http/axios-client";
import { OwnerProfile } from "src/presentation/screens/app";

export const ownerProfileFactory = () => {
  const httpClient = new AxiosHttpClient();
  return <OwnerProfile httpClient={httpClient} />;
};

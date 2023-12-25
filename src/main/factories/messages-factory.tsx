import { AxiosHttpClient } from "src/infra/http/axios-client";
import { Messages } from "src/presentation/screens/app";

export const messagesFactory = () => {
  const httpClient = new AxiosHttpClient();
  return <Messages httpClient={httpClient} />;
};

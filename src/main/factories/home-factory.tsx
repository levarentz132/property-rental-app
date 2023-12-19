import { AxiosHttpClient } from "src/infra/http/axios-client";
import { Home } from "src/presentation/screens/app";

export const homeFactory = () => {
  const httpClient = new AxiosHttpClient();
  return <Home httpClient={httpClient} />;
};

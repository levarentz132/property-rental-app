import { AxiosHttpClient } from "src/infra/http/axios-client";
import { Login } from "src/presentation/screens/auth";

export const signInFactory = () => {
  const httpClient = new AxiosHttpClient();
  return <Login httpClient={httpClient} />;
};

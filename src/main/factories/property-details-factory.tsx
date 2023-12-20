import { AxiosHttpClient } from "src/infra/http/axios-client";
import { PropertyDetails } from "src/presentation/screens/app";

export const propertyDetailsFactory = () => {
  const httpClient = new AxiosHttpClient();
  return <PropertyDetails httpClient={httpClient} />;
};

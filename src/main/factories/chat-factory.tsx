import React from "react";
import { AxiosHttpClient } from "src/infra/http/axios-client";
import { Chat } from "src/presentation/screens/app";

export const chatFactory = () => {
  const httpClient = new AxiosHttpClient();
  return <Chat httpClient={httpClient} />;
};

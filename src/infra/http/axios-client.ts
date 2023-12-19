import axios, { type AxiosRequestConfig } from "axios";

import type {
  HttpClient,
  HttpGetClient,
  HttpHeadClient,
  HttpPostClient,
  HttpPutClient,
} from "src/data/contracts/infra";

export class AxiosHttpClient implements HttpClient<AxiosRequestConfig> {
  async head(
    params: HttpHeadClient.Params<AxiosRequestConfig<any>>,
  ): Promise<HttpHeadClient.Result> {
    const httpResponse = await axios.head(params.url, params.config);
    return {
      statusCode: httpResponse.status,
      requestData: httpResponse.request,
    };
  }

  async put<ResponseBody = any>(
    params: HttpPutClient.Params<Record<string, any>, AxiosRequestConfig<any>>,
  ): Promise<HttpPutClient.Result<ResponseBody>> {
    const httpResponse = await axios.put(
      params.url,
      params.body,
      params.config,
    );
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data,
    };
  }

  async post<ResponseBody = any>(
    params: HttpPostClient.Params,
  ): Promise<HttpPostClient.Result<ResponseBody>> {
    const httpResponse = await axios.post(
      params.url,
      params.body,
      params.config,
    );
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data,
    };
  }

  async get(
    params: HttpGetClient.Params<Record<string, any>>,
  ): Promise<HttpGetClient.Result<any>> {
    const httpResponse = await axios.get(params.url, params.config);
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data,
    };
  }
}

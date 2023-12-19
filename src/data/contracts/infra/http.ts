export enum HttpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  notFound = 404,
  serverError = 500,
}

export type HttpResponse<T> = {
  statusCode: HttpStatusCode;
  body?: T;
};

export namespace HttpGetClient {
  export type Params<T> = {
    url: string;
    config?: T;
  };
  export type Result<R> = HttpResponse<R>;
}

export namespace HttpHeadClient {
  export type Params<T> = {
    url: string;
    config?: T;
  };
  export type Result = Omit<HttpResponse<null>, "body"> & {
    requestData: any;
  };
}

export interface HttpGetClient<T = Record<string, any>> {
  get: <R = any>(
    params: HttpGetClient.Params<T>,
  ) => Promise<HttpGetClient.Result<R>>;
}

export namespace HttpPostClient {
  export type Params<Body = any, Config = Record<string, any>> = {
    url: string;
    body: Body;
    config?: Config;
  };
  export type Result<R> = HttpResponse<R>;
}

export namespace HttpPutClient {
  export type Params<Body = any, Config = Record<string, any>> = {
    url: string;
    body: Body;
    config?: Config;
  };
  export type Result<R> = HttpResponse<R>;
}

export interface HttpPutClient<
  RequestBody = Record<string, any>,
  Config = any,
> {
  put: <ResponseBody = any>(
    params: HttpPutClient.Params<RequestBody, Config>,
  ) => Promise<HttpPutClient.Result<ResponseBody>>;
}

export interface HttpPostClient<
  RequestBody = Record<string, any>,
  Config = any,
> {
  post: <ResponseBody = any>(
    params: HttpPostClient.Params<RequestBody, Config>,
  ) => Promise<HttpPostClient.Result<ResponseBody>>;
}

export interface HttpHeadClient<T = Record<string, any>> {
  head: (params: HttpHeadClient.Params<T>) => Promise<HttpHeadClient.Result>;
}

export type HttpClient<Config> = HttpGetClient<Config> &
  HttpPostClient<Record<string, any>, Config> &
  HttpPutClient<Record<string, any>, Config> &
  HttpHeadClient<Config>;

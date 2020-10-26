export enum ERequestMethod {
  Get = 'GET',
  Post = 'POST',
}

export enum EStatusCode {
  Created = 201,
  Unauthorized = 401,
}

type TError = {
  param: string;
  message: string;
};

export type TParams = {
  token?: string;
  userId?: string;
};

export type TResponseData<T> = {
  data: T;
  message: string;
  params: TParams;
  error: TError[];
};

export type TLogout = () => void;

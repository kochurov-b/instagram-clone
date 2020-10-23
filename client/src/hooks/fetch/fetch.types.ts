export enum ERequestMethod {
  Get = 'GET',
  Post = 'POST',
}

type TError = {
  param: string;
  message: string;
};

export type TParams = {
  token?: string;
  userId?: string;
};

export type TResponseData = {
  data: any;
  message: string;
  params: TParams;
  error: TError[];
};

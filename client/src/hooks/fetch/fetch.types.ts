export enum ERequestMethod {
  Get = 'GET',
  Post = 'POST',
}

type TError = {
  param: string;
  message: string;
};

export type TResponseData = {
  data: any;
  message: string;
  params: Object;
  errors: TError[];
};

export enum ELoadStatus {
  Request = 'REQUEST',
  Success = 'SUCCESS',
  Failure = 'FAILURE',
}

export type TTypeLoadStatusAction = {
  [ELoadStatus.Request]: string;
  [ELoadStatus.Success]: string;
  [ELoadStatus.Failure]: string;
};

export type TAction = {
  type: string;
  payload?: any;
};

export type TGenerateLoadStatusExpected = {
  request: (payload?: any) => TAction;
  success: (payload?: any) => TAction;
  failure: (payload?: any) => TAction;
};

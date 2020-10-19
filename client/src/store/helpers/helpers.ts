import {
  ELoadStatus,
  TAction,
  TGenerateLoadStatusExpected,
  TTypeLoadStatusAction,
} from './helpers.types';

type TGenerateLoadStatusAction = (name: string) => TTypeLoadStatusAction;

type TGenerateLoadStatus = (
  name: TTypeLoadStatusAction,
) => TGenerateLoadStatusExpected;

type TActionCreator = (type: string, payload?: any) => TAction;

const generateActionCreator: TActionCreator = (type, payload) => ({
  type,
  payload,
});

export const generateLoadStatusAction: TGenerateLoadStatusAction = (name) =>
  [ELoadStatus.Request, ELoadStatus.Success, ELoadStatus.Failure].reduce(
    (acc, status) => ({
      ...acc,
      [status]: `${name}_${status}`,
    }),
    {} as TTypeLoadStatusAction,
  );

export const generateLoadStatus: TGenerateLoadStatus = (name) => ({
  request: (payload) => generateActionCreator(name.REQUEST, payload),
  success: (payload) => generateActionCreator(name.SUCCESS, payload),
  failure: (payload) => generateActionCreator(name.FAILURE, payload),
});

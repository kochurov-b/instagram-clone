import {
  TAction,
  TGenerateLoadStatusActionCreatorExpected,
} from '../helpers/helpers.types';

export type TState = {
  loading: boolean;
};

export type TLogin = TGenerateLoadStatusActionCreatorExpected;

export type TActions = TAction;

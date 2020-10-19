import { TAction } from '../helpers/helpers.types';

export type TState = {
  loading: boolean;
  error: Error;
};

export type TActions = TAction;

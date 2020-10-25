import { TSetUserInfoAction, TUser } from './User/User.types';

export type TState = {
  user: TUser;
};

export type TReducer = (state: TState, action: TActions) => TState;

export type TAction<T, P> = {
  type: T;
  payload?: P;
};

export type TActions = TSetUserInfoAction;

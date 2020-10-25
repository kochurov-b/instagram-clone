import { TAction } from '../store.types';
import { EUserConstant } from './User.constants';

type TCounter = {
  count: number;
};

export type TUser = {
  full_name: string;
  username: string;
  posts: TCounter;
  followers: TCounter;
  following: TCounter;
};

export type TUserResponseData = {
  user: TUser;
};

export type TSetUserInfoAction = TAction<EUserConstant, TUser>;

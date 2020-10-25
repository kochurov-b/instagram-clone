import { EUserConstant } from './User.constants';
import { TSetUserInfoAction, TUser } from './User.types';

type TSetUserInfo = (data: TUser) => TSetUserInfoAction;

export const setUserInfo: TSetUserInfo = (data) => ({
  type: EUserConstant.SetUserInfo,
  payload: data,
});

import { TTypeLoadStatusAction } from '../helpers/helpers.types';
import { generateLoadStatusAction } from '../helpers/helpers';

enum EAuth {
  Login = 'LOGIN',
  Register = 'REGISTER',
}

type TAuthConstants = {
  [EAuth.Login]: TTypeLoadStatusAction;
  [EAuth.Register]: TTypeLoadStatusAction;
};

export const authConstants: TAuthConstants = {
  [EAuth.Login]: generateLoadStatusAction(EAuth.Login),
  [EAuth.Register]: generateLoadStatusAction(EAuth.Register),
};

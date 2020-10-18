import { TTypeLoadStatusAction } from '../helpers/helpers.types';
import { generateLoadStatusAction } from '../helpers/helpers';

enum EAuth {
  Login = 'LOGIN',
}

type TAuthConstants = {
  [EAuth.Login]: TTypeLoadStatusAction;
};

export const authConstants: TAuthConstants = {
  LOGIN: generateLoadStatusAction(EAuth.Login),
};

import { generateLoadStatusActionCreator } from '../helpers/helpers';
import { authConstants } from './Auth.constants';
import { TLogin } from './Auth.types';

export const login: TLogin = generateLoadStatusActionCreator(
  authConstants.LOGIN,
);

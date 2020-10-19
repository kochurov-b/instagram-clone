import { generateLoadStatus } from '../helpers/helpers';
import { TGenerateLoadStatusExpected } from '../helpers/helpers.types';
import { authConstants } from './Auth.constants';

export const login: TGenerateLoadStatusExpected = generateLoadStatus(
  authConstants.LOGIN,
);

export const register: TGenerateLoadStatusExpected = generateLoadStatus(
  authConstants.LOGIN,
);

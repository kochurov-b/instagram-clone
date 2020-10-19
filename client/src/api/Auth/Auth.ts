import { Either } from '@sweet-monads/either';

import { request } from '../api';
import { ERequestMethod } from '../api.types';
import { AuthorizationError } from './Auth.errors';
import { TRegisterArgs } from './Auth.types';

type TLogin = (
  login: string,
  password: string,
) => Promise<Either<AuthorizationError, Either<string, any>>>;

type TRegister = (
  args: TRegisterArgs,
) => Promise<Either<AuthorizationError, Either<string, any>>>;

export const login: TLogin = async (login, password) => {
  const response = await request({
    method: ERequestMethod.Post,
    query: 'auth/login',
    body: { login, password },
  });

  return response
    .mapLeft(() => new AuthorizationError('Cant authorize user'))
    .mapRight((data) => data);
};

export const register: TRegister = async ({
  email,
  full_name,
  login,
  password,
}) => {
  const response = await request({
    method: ERequestMethod.Post,
    query: 'auth/register',
    body: { email, full_name, login, password },
  });

  return response
    .mapLeft(() => new AuthorizationError('Cant registration user'))
    .mapRight((data) => data);
};

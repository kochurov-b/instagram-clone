import { Either } from '@sweet-monads/either';

import { request } from '../api';
import { ERequestMethod } from '../api.types';
import { AuthorizationError } from './Auth.errors';

type TLogin = (
  login: string,
  password: string,
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

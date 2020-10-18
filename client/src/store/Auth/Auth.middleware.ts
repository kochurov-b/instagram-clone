import { ThunkAction } from 'redux-thunk';

import { login as loginApi } from '../../api/Auth/Auth';
import { login as loginAction } from './Auth.actions';
import { TActions, TState } from './Auth.types';

type TLoginThunk = (
  login: string,
  password: string,
) => ThunkAction<void, TState, undefined, TActions>;

export const loginThunk: TLoginThunk = (login, password) => async (
  dispatch,
) => {
  dispatch(loginAction.request());
  const response = await loginApi(login, password);

  response
    .mapLeft(() => dispatch(loginAction.failure()))
    .mapRight((data) => {
      dispatch(loginAction.success());
      const isError = data.isLeft();

      // if (isError) dispatch(loginAction.success());
    });
};

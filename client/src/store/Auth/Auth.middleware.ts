import { Either } from '@sweet-monads/either';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import {
  login as loginApi,
  register as registerApi,
} from '../../api/Auth/Auth';
import { AuthorizationError } from '../../api/Auth/Auth.errors';
import { TRegisterArgs } from '../../api/Auth/Auth.types';
import { ESeverity } from '../../components/Snackbar/Snackbar.types';
import { TAction, TGenerateLoadStatusExpected } from '../helpers/helpers.types';
import { openSnackbar } from '../Snackbar/Snackbar.actions';
import {
  login as loginAction,
  register as registerAction,
} from './Auth.actions';
import { TActions, TState } from './Auth.types';

type TLoginThunk = (
  login: string,
  password: string,
) => ThunkAction<void, TState, undefined, TActions>;

type TRegisterThunk = (
  args: TRegisterArgs,
) => ThunkAction<void, TState, undefined, TActions>;

type TResponseProcessingArgs = {
  action: TGenerateLoadStatusExpected;
  response: Either<AuthorizationError, Either<string, any>>;
  dispatch: ThunkDispatch<TState, undefined, TAction>;
};

type TResponseProcessing = (args: TResponseProcessingArgs) => void;

const responseProcessing: TResponseProcessing = ({
  action,
  response,
  dispatch,
}) =>
  response
    .mapLeft((error) => dispatch(action.failure(error)))
    .mapRight((data) => {
      dispatch(action.success());

      const isError = data.isLeft();
      const { value: message } = data;

      if (isError) dispatch(openSnackbar(message, ESeverity.Error));
    });

export const loginThunk: TLoginThunk = (login, password) => async (
  dispatch,
) => {
  dispatch(loginAction.request());
  const response = await loginApi(login, password);

  return responseProcessing({ action: loginAction, response, dispatch });
};

export const registerThunk: TRegisterThunk = ({
  email,
  full_name,
  login,
  password,
}) => async (dispatch) => {
  dispatch(registerAction.request());
  const response = await registerApi({ email, full_name, login, password });

  return responseProcessing({ action: registerAction, response, dispatch });
};

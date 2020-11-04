import { useCallback, useContext, useState } from 'react';
import { Either, left, right } from '@sweet-monads/either';
import { isEmpty } from 'lodash';

import {
  ERequestMethod,
  EStatusCode,
  TLogout,
  TResponseData,
} from './fetch.types';
import { config } from '../../config/config';
import { NetworkError } from './fetch.errors';
import {
  ESeverity,
  TOpenSnackbar,
} from '../../components/Snackbar/Snackbar.types';
import { SnackbarContext } from '../../components/Snackbar/Snackbar.context';
import { AuthContext } from '../../context/Auth.context';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

type THeaders = Headers | string[][] | Record<string, string>;

type TRequestArgs = {
  query: string;
  method?: string;
  headers?: THeaders;
  body?: Object | null;
};

type TData<T> = Either<void, TResponseData<T>>;

type TErrorProcessingArgs<T> = {
  response: Response;
  data: Either<string, TResponseData<T>>;
  logout: TLogout;
  openSnackbar: TOpenSnackbar;
};

type TStatusCodeExpected = {
  [EStatusCode.Unauthorized]: () => void;
};

type TStatusFactory = (logout: TLogout) => TStatusCodeExpected;

const statusFactory: TStatusFactory = (logout) => ({
  [EStatusCode.Unauthorized]: () => logout(),
});

const errorProcessing = <T extends any>({
  response,
  data,
  logout,
  openSnackbar,
}: TErrorProcessingArgs<T>): TData<T> =>
  data
    .mapLeft((message) => {
      const { status } = response;

      openSnackbar({ open: true, message, severity: ESeverity.Error });
      statusFactory(logout)[status as keyof TStatusCodeExpected]();
    })
    .mapRight((data) => {
      const { message } = data;

      if (message !== '')
        openSnackbar({ open: true, message, severity: ESeverity.Success });

      return data;
    });

export const useFetch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>(new Error());
  const { logout } = useContext(AuthContext);
  const { openSnackbar } = useContext(SnackbarContext);

  const request = useCallback(
    async <T extends any>({
      query,
      method = ERequestMethod.Get,
      headers = {},
      body = null,
    }: TRequestArgs): Promise<Either<Error, TData<T>>> => {
      setLoading(() => true);
      try {
        const { apiPath } = config;
        const url = `/${apiPath}/${query}`;

        if (body !== null) {
          body = JSON.stringify(body);
          headers = {
            ...headers,
            ...DEFAULT_HEADERS,
          };
        }

        const response = await fetch(url, {
          method,
          headers,
          body: body as string,
        });
        const data: TResponseData<T> = await response.json();
        const { message, error } = data;
        const isError = !isEmpty(error) && message !== '';
        const errorDataCheck: Either<string, TResponseData<T>> = isError
          ? left(message)
          : right(data);

        setLoading(() => false);

        return right(
          errorProcessing({
            response,
            logout,
            data: errorDataCheck,
            openSnackbar,
          }),
        );
      } catch (error) {
        setLoading(() => false);
        setError(() => error);

        return left(new NetworkError(error.message));
      }
    },
    [openSnackbar, logout],
  );

  const get = useCallback(
    async <T extends any>(query: string, headers?: THeaders) =>
      await request<T>({
        method: ERequestMethod.Get,
        query,
        headers,
      }),
    [request],
  );

  return { loading, error, request, get };
};

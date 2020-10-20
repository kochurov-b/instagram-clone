import { useContext, useState } from 'react';
import { Either, left, right } from '@sweet-monads/either';

import { ERequestMethod, TResponseData } from './fetch.types';
import { config } from '../../config/config';
import { NetworkError } from './fetch.errors';
import {
  ESeverity,
  TOpenSnackbar,
} from '../../components/Snackbar/Snackbar.types';
import { SnackbarContext } from '../../components/Snackbar/Snackbar.context';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

type TRequestArgs = {
  query: string;
  method?: string;
  headers?: Headers | string[][] | Record<string, string>;
  body?: Object | null;
};

type TData = Either<void, TResponseData>;

type TRequest = (args: TRequestArgs) => Promise<Either<Error, TData>>;

type TErrorProcessing = (
  data: Either<string, TResponseData>,
  openSnackbar: TOpenSnackbar,
) => TData;

const errorProcessing: TErrorProcessing = (data, openSnackbar) =>
  data
    .mapLeft((message) =>
      openSnackbar({ open: true, message, severity: ESeverity.Error }),
    )
    .mapRight((data) => data);

export const useFetch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>(new Error());

  const { openSnackbar } = useContext(SnackbarContext);

  const request: TRequest = async ({
    query,
    method = ERequestMethod.Get,
    headers = {},
    body = null,
  }) => {
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
      const data: TResponseData = await response.json();
      const { message } = data;
      const errorDataCheck: Either<string, TResponseData> =
        message === '' ? right(data) : left(message);

      setLoading(() => false);

      return right(errorProcessing(errorDataCheck, openSnackbar));
    } catch (error) {
      setLoading(() => false);
      setError(() => error);

      return left(new NetworkError(error.message));
    }
  };

  return { loading, error, request };
};

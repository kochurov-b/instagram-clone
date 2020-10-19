import { Either, left, right } from '@sweet-monads/either';

import { ERequestMethod } from './api.types';
import { config } from '../config/config';
import { NetworkError } from './api.errors';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

type TRequestArgs = {
  query: string;
  method?: string;
  headers?: Headers | string[][] | Record<string, string>;
  body?: Object | null;
};

type TError = {
  param: string;
  message: string;
};

type TResponseData = {
  data: any;
  message: string;
  params: Object;
  errors: TError[];
};

type TRequest = (
  args: TRequestArgs,
) => Promise<Either<Error, Either<string, any>>>;

const processResponse = ({
  data,
  message,
}: TResponseData): Either<string, any> =>
  message === '' ? right(data) : left(message);

export const request: TRequest = async ({
  query,
  method = ERequestMethod.Get,
  headers = {},
  body = null,
}) => {
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

    return right(processResponse(data));
  } catch (error) {
    return left(new NetworkError(error.message));
  }
};

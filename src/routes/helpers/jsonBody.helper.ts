interface IError {
  param: string;
  message: string;
}

interface IJsonBody {
  data?: any[];
  message?: string;
  params?: Object;
  error?: Error | IError[];
}

export const generateJsonBody = ({
  data = [],
  message = '',
  params = {},
  error = new Error(),
}: IJsonBody): IJsonBody => ({
  data,
  message,
  params,
  error,
});

interface IError {
  param: string;
  message: string;
}

type TParams = {
  userId?: number;
};

interface IJsonBody {
  data?: any[] | Object;
  message?: string;
  params?: TParams;
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

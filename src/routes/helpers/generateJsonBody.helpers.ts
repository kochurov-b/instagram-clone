interface IError {
  param: string;
  message: string;
}

interface IJsonBody {
  data?: any[];
  message?: string;
  params?: Object;
  errors?: IError[];
}

export const generateJsonBody = ({
  data = [],
  message = '',
  params = {},
  errors = [],
}: IJsonBody): IJsonBody => ({
  data,
  message,
  params,
  errors,
});

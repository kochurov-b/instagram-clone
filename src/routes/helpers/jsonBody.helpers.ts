interface IJsonBody {
  data?: any[];
  message?: string;
  params?: Object;
}

export const customJsonBody = ({
  data = [],
  message = '',
  params = {},
}: IJsonBody): IJsonBody => ({
  data,
  message,
  params,
});

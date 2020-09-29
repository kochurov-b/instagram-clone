const EMAIL_EN_REG = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;

const SPECIAL_ERROR_FACTORY: TSpecialErrorFactory = {
  email: (value, required) => emailValidationError(value, required),
  password: (value, required) => requiredFieldError(value, required),
};

interface IGenerateErrorArgs {
  name: string;
  value: string;
  required: boolean;
}

type TSpecialErrorFactory = Record<
  string,
  (value: string, required: boolean) => string
>;

type TGenerateError = (args: IGenerateErrorArgs) => string;

type TFieldError = (value: string, required?: boolean) => string;

export const generateError: TGenerateError = ({ name, value, required }) => {
  const specialError = SPECIAL_ERROR_FACTORY[name];

  if (!specialError) return requiredFieldError(value, required);

  return specialError(value, required);
};

const requiredFieldError: TFieldError = (value, required) =>
  value.trim() === '' && required ? 'Required field' : '';

const emailValidationError: TFieldError = (value) =>
  EMAIL_EN_REG.test(value) ? '' : 'Incorrect email';

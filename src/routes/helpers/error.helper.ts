import { Result, ValidationError } from 'express-validator';

interface IGenerateErrorsExpected {
  param: string;
  message: string;
}

type TGenerateErrors = (
  errors: Result<ValidationError>,
) => IGenerateErrorsExpected[];

export const generateErrors: TGenerateErrors = (errors) =>
  errors.array().map(({ param, msg }) => ({ param, message: msg }));

import { Result, ValidationError } from 'express-validator';

interface IGenerateErrorsOutput {
  param: string;
  message: string;
}

type TGenerateErrors = (
  errors: Result<ValidationError>,
) => IGenerateErrorsOutput[];

export const generateErrors: TGenerateErrors = (errors) =>
  errors.array().map(({ param, msg }) => ({ param, message: msg }));

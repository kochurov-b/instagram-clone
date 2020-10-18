import { EAuthMessage, ECommonMessage, EFormMessage } from './messages.types';

export const AUTH_MESSAGES = {
  [EAuthMessage.UserCreated]: 'User created',
  [EAuthMessage.UserNotFound]: 'User not found',
  [EAuthMessage.UserAlreadyExist]: 'User already exist',
  [EAuthMessage.InvalidLoginOrPassword]: 'Invalid login or password',
};

export const FORM_MESSAGES = {
  [EFormMessage.FieldNotEmpty]: 'The field cannot be empty',
  [EFormMessage.MinLengthPassword]: 'Minimum password length 6 characters',
};

export const COMMON_MESSAGES = {
  [ECommonMessage.SomethingWontWrong]: 'Something wont wrong',
};

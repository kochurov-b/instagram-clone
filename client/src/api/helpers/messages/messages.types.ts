export enum EAuthMessage {
  UserCreated = 'user_created',
  UserNotFound = 'user_not_found',
  UserAlreadyExist = 'user_already_exist',
  InvalidLoginOrPassword = 'invalid_login_or_password',
}

export enum EFormMessage {
  FieldNotEmpty = 'not_be_empty',
  MinLengthPassword = 'min_length_6',
}

export enum ECommonMessage {
  SomethingWontWrong = 'something_wont_wrong',
}
export type TCommonMessages = ECommonMessage.SomethingWontWrong;

export type TFormMessages =
  | EFormMessage.FieldNotEmpty
  | EFormMessage.MinLengthPassword;

export type TAuthMessages =
  | EAuthMessage.UserCreated
  | EAuthMessage.UserNotFound
  | EAuthMessage.UserAlreadyExist
  | EAuthMessage.InvalidLoginOrPassword;

export type TMessages = TCommonMessages | TFormMessages | TAuthMessages;

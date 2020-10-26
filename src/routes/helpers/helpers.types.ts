export enum EStatusCode {
  Ok = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  InternalServerError = 500,
}

export enum EFormMessage {
  FieldNotEmpty = 'The field cannot be empty',
  MinPassword = 'Minimum password length 6 characters',
  IncorrectData = 'Incorrect data entered',
}

export enum ECommonMessage {
  SomethingWontWrong = 'Something wont wrong',
}

export enum EStatusCode {
  Ok = 200,
  Created = 201,
  BadRequest = 400,
  InternalServerError = 500,
}

export enum EFormMessage {
  FieldNotEmpty = 'not_be_empty',
  MinPassword = 'min_length_6',
}

export enum ECommonMessage {
  SomethingWontWrong = 'something_wont_wrong',
}

enum EUserError {
  UserCreated = 'User created',
  UserNotFound = 'User not found',
  UserAlreadyExist = 'User already exist',
}

enum ECommonError {
  InvalidLoginOrPassword = 'Invalid login or password',
  FieldNotEmpty = 'The field cannot be empty',
  MinPassword = 'Minimum password length 6 characters',
  SomethingWontWrong = 'Something wont wrong',
}

export const errorMessage = {
  ...ECommonError,
  ...EUserError,
};

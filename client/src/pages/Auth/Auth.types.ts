import { FormEvent } from 'react';

import { IFormField } from '../../components/Field/Field.types';

export interface IForm {
  user_name: IFormField;
  password: IFormField;
}

export enum EForm {
  USER_NAME = 'user_name',
  PASSWORD = 'password',
}

export type TOnSubmit = (e: FormEvent<HTMLFormElement>) => void;

import { FormEvent } from 'react';

import { IFormField } from '../../components/Field/Field.types';

export interface IForm {
  email?: IFormField;
  full_name?: IFormField;
  user_name: IFormField;
  password: IFormField;
}

export enum EForm {
  Email = 'email',
  FullName = 'full_name',
  UserName = 'user_name',
  Password = 'password',
}

export interface IHelperLink {
  title: string;
  href: string;
}

export interface IHelper {
  text: string;
  link: IHelperLink;
}

export type TOnSubmit = (e: FormEvent<HTMLFormElement>) => void;

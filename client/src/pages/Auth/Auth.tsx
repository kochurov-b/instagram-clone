import React, { FC, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { get } from 'lodash';

import { IField } from '../../components/Field/Field.types';
import { generateError } from '../../utils/form/errors/errors';
import { generateForm } from '../../utils/form/form';
import { TOnChange as TOnChangeForm } from '../../utils/form/form.types';
import { useFetch } from '../../hooks/fetch/fetch.hook';
import { ERequestMethod, TParams } from '../../hooks/fetch/fetch.types';
import { AuthorizationError } from '../../hooks/fetch/fetch.errors';
import { AuthLayout } from './Auth.layout';
import { EForm, IForm, IHelper, TOnSubmit } from './Auth.types';
import { AuthContext } from '../../context/Auth.context';
import { TLogin as TLoginStorage } from '../../hooks/auth/auth.types';

const REGISTER_PAGE_REG = /\bregister\b/;

const AUTH_HELPER: IAuthHelper = {
  login: {
    text: `Don't have an account?`,
    link: { title: 'Sign up', href: '/register' },
  },
  register: {
    text: 'Have an account?',
    link: { title: 'Log in', href: '/login' },
  },
};

const LOGIN_FIELDS: IField[] = [
  {
    label: 'Username',
    name: EForm.UserName,
    required: true,
  },
  {
    label: 'Password',
    name: EForm.Password,
    type: 'password',
    required: true,
  },
];

const REGISTER_FIELDS: IField[] = [
  { label: 'Email', name: EForm.Email, required: true },
  {
    label: 'Full name',
    name: EForm.FullName,
    required: true,
  },
];

interface IAuthHelper {
  login: IHelper;
  register: IHelper;
}

type TIsSubmitButtonDisable = (form: IForm) => boolean;

type TGenerateFormFields = (isRegisterPage: boolean) => IField[];

type TLogin = (login: string, password: string) => void;

type TRegisterArgs = {
  email: string;
  full_name: string;
  login: string;
  password: string;
};

type TRegister = (args: TRegisterArgs) => void;

type TSaveLoginDataToStorage = (
  params: TParams,
  loginStorage: TLoginStorage,
) => void;

const generateFormFields: TGenerateFormFields = (isRegisterPage) =>
  isRegisterPage ? [...REGISTER_FIELDS, ...LOGIN_FIELDS] : LOGIN_FIELDS;

const isSubmitButtonDisable: TIsSubmitButtonDisable = (form) =>
  Object.values(form).some(
    ({ value, required, error }) =>
      error.length !== 0 || (required && value.length === 0),
  );

const saveLoginDataToStorage: TSaveLoginDataToStorage = (
  params,
  loginStorage,
) => {
  const token = get(params, 'token', null);
  const userId = get(params, 'userId', null);

  if (token !== null && userId !== null) {
    loginStorage(token, userId);
  }
};

export const Auth: FC = () => {
  const {
    location: { pathname },
  } = useHistory();
  const { request } = useFetch();
  const { login: loginStorage } = useContext(AuthContext);
  const isRegisterPage = REGISTER_PAGE_REG.test(pathname);
  const initialForm = generateForm<IForm>(generateFormFields(isRegisterPage));
  const [form, setForm] = useState<IForm>(initialForm);
  const helper = isRegisterPage ? AUTH_HELPER.register : AUTH_HELPER.login;
  const submitButtonTitle = isRegisterPage ? 'Sign up' : 'Log in';

  useEffect(() => {
    setForm(() => generateForm<IForm>(generateFormFields(isRegisterPage)));
  }, [isRegisterPage]);

  const login: TLogin = async (login, password) => {
    const response = await request({
      method: ERequestMethod.Post,
      query: 'auth/login',
      body: { login, password },
    });

    response
      .mapLeft(() => new AuthorizationError('Cant authorize user'))
      .mapRight((data) => {
        data.mapRight(({ params }) =>
          saveLoginDataToStorage(params, loginStorage),
        );
      });
  };

  const register: TRegister = async ({ email, full_name, login, password }) => {
    const response = await request({
      method: ERequestMethod.Post,
      query: 'auth/register',
      body: { email, full_name, login, password },
    });

    return response
      .mapLeft(() => new AuthorizationError('Cant registration user'))
      .mapRight((data) => {
        data.mapRight(({ params }) =>
          saveLoginDataToStorage(params, loginStorage),
        );
      });
  };

  const handleChange: TOnChangeForm<IForm> = ({ name, value, required }) =>
    setForm((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        value,
        error: generateError({ name, value, required }),
      },
    }));

  const handleSubmit: TOnSubmit = async (e) => {
    e.preventDefault();

    const {
      user_name: { value: userNameValue },
      password: { value: passwordValue },
    } = form;
    const emailValue = get(form, 'email.value', '');
    const fullNameValue = get(form, 'full_name.value', '');

    return isRegisterPage
      ? register({
          email: emailValue,
          full_name: fullNameValue,
          login: userNameValue,
          password: passwordValue,
        })
      : login(userNameValue, passwordValue);
  };

  return (
    <AuthLayout
      form={form}
      helper={helper}
      isSubmitButtonDisable={isSubmitButtonDisable(form)}
      submitButtonTitle={submitButtonTitle}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

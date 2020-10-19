import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { get } from 'lodash';

import { IField } from '../../components/Field/Field.types';
import { loginThunk, registerThunk } from '../../store/Auth/Auth.middleware';
import { generateError } from '../../utils/form/errors/errors';
import { generateForm } from '../../utils/form/form';
import { TOnChange as TOnChangeForm } from '../../utils/form/form.types';

import { AuthLayout } from './Auth.layout';
import { EForm, IForm, IHelper, TOnSubmit } from './Auth.types';

const REGISTER_ROUTE_REG = /\bregister\b/;

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

type TGenerateFormFields = (isRegister: boolean) => IField[];

const generateFormFields: TGenerateFormFields = (isRegister) =>
  isRegister ? [...REGISTER_FIELDS, ...LOGIN_FIELDS] : LOGIN_FIELDS;

const isSubmitButtonDisable: TIsSubmitButtonDisable = (form) =>
  Object.values(form).some(
    ({ value, required, error }) =>
      error.length !== 0 || (required && value.length === 0),
  );

export const Auth: FC = () => {
  const {
    location: { pathname },
  } = useHistory();
  const isRegister = REGISTER_ROUTE_REG.test(pathname);
  const initialForm = generateForm<IForm>(generateFormFields(isRegister));
  const [form, setForm] = useState<IForm>(initialForm);
  const helper = isRegister ? AUTH_HELPER.register : AUTH_HELPER.login;
  const submitButtonTitle = isRegister ? 'Sign up' : 'Log in';
  const dispatch = useDispatch();

  useEffect(() => {
    setForm(() => generateForm<IForm>(generateFormFields(isRegister)));
  }, [isRegister]);

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

    const currentAction = isRegister
      ? registerThunk({
          email: emailValue,
          full_name: fullNameValue,
          login: userNameValue,
          password: passwordValue,
        })
      : loginThunk(userNameValue, passwordValue);

    dispatch(currentAction);
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

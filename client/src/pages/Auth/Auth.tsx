import React, { FC, useEffect, useState } from 'react';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { IField } from '../../components/Field/Field.types';
import { generateForm } from '../../utils/form/form';

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

const COMMON_FIELDS: IField[] = [
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

export const Auth: FC = () => {
  const {
    location: { pathname },
  } = useHistory();
  const initialForm = generateForm<IForm>(COMMON_FIELDS);
  const [form, setForm] = useState<IForm>(initialForm);
  const isRegister = REGISTER_ROUTE_REG.test(pathname);
  const helper = isRegister ? AUTH_HELPER.register : AUTH_HELPER.login;
  const submitButtonTitle = isRegister ? 'Sign up' : 'Log in';

  useEffect(() => {
    setForm((prevState: IForm) => {
      if (isRegister)
        return { ...generateForm<IForm>(REGISTER_FIELDS), ...prevState };

      const { full_name, email, ...form } = prevState;

      return form;
    });
  }, [isRegister]);

  const handleChange = useCallback((value: string, name: keyof IForm) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        value,
      },
    }));
  }, []);

  const handleSubmit: TOnSubmit = (e) => {
    e.preventDefault();

    console.log(form);
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: form.user_name.value,
        password: form.password.value,
      }),
    });
  };

  return (
    <AuthLayout
      form={form}
      helper={helper}
      submitButtonTitle={submitButtonTitle}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

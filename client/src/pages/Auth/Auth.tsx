import React, { FC, useState } from 'react';

import { IField } from '../../components/Field/Field.types';
import { generateForm } from '../../utils/ form/form';

import { AuthLayout } from './Auth.layout';
import { EForm, IForm, TOnSubmit } from './Auth.types';

const FORM_FIELDS: IField[] = [
  {
    label: 'Username',
    name: EForm.USER_NAME,
    required: true,
  },
  {
    label: 'Password',
    name: EForm.PASSWORD,
    required: true,
  },
];

export const Auth: FC = () => {
  const initialForm = generateForm<IForm>(FORM_FIELDS);
  const [form, setForm] = useState<IForm>(initialForm);

  const handleChange = (value: string, name: keyof IForm) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        value,
      },
    }));
  };

  const handleSubmit: TOnSubmit = (e) => {
    e.preventDefault();

    console.log(form);
  };

  return (
    <AuthLayout form={form} onChange={handleChange} onSubmit={handleSubmit} />
  );
};

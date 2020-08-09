import React, { FC } from 'react';

import { Field } from '../../components/Field/Field';
import { TOnChange } from '../../utils/ form/form.types';
import { Button } from '../../components/Button/Button';
import Logo from '../../assets/images/logo.png';

import { IForm, TOnSubmit } from './Auth.types';
import './Auth.style.scss';

interface IProps {
  form: IForm;
  onChange: TOnChange<IForm>;
  onSubmit: TOnSubmit;
}

const renderHeader = (): JSX.Element => (
  <header className="auth-page__logo">
    <img src={Logo} alt="logo" className="auth-page__logo-img" />
  </header>
);

const renderForm = ({
  form: { user_name, password },
  onChange,
  onSubmit,
}: IProps): JSX.Element => (
  <form className="auth-page__form" onSubmit={onSubmit}>
    <Field
      {...user_name}
      onChange={(value) => onChange(value, user_name.name as keyof IForm)}
    />
    <Field
      {...password}
      onChange={(value) => onChange(value, password.name as keyof IForm)}
    />
    <Button type="submit">Log in</Button>
  </form>
);

export const AuthLayout: FC<IProps> = (props) => {
  return (
    <div className="auth-page">
      <div className="auth-page__container">
        {renderHeader()}
        {renderForm(props)}
      </div>
    </div>
  );
};

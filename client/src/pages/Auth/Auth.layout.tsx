import React, { FC, memo } from 'react';
import { Link } from 'react-router-dom';

import { Field } from '../../components/Field/Field';
import { TOnChange } from '../../utils/form/form.types';
import { IFormField } from '../../components/Field/Field.types';
import { Button } from '../../components/Button/Button';
import { EType as EButtonType } from '../../components/Button/Button.types';
import Logo from '../../assets/images/logo.png';

import { IForm, IHelper, IHelperLink, TOnSubmit } from './Auth.types';
import './Auth.style.scss';

interface ICommonProps {
  form: IForm;
  submitButtonTitle: string;
  onChange: TOnChange<IForm>;
  onSubmit: TOnSubmit;
}

interface IProps extends ICommonProps {
  helper: IHelper;
}

type TRenderContent = (args: ICommonProps) => JSX.Element;

type TRenderHelper = (text: string, link: IHelperLink) => JSX.Element;

type TRenderFields = (form: IForm, onChange: TOnChange<IForm>) => JSX.Element[];

type TRenderField = (
  field: IFormField,
  onChange: TOnChange<IForm>,
) => JSX.Element;

const MemoLink = memo(Link);

const renderField: TRenderField = (field, onChange) => (
  <Field
    {...field}
    onChange={(value) => onChange(value, field.name as keyof IForm)}
  />
);

const renderFields: TRenderFields = (form, onChange) =>
  Object.values(form).map((field) => renderField(field, onChange));

const renderContent: TRenderContent = ({
  form,
  submitButtonTitle,
  onChange,
  onSubmit,
}) => (
  <header className="auth__content">
    <div className="auth__logo">
      <img src={Logo} alt="instagram-clone" className="auth__logo-img" />
    </div>
    <form className="auth__form" onSubmit={onSubmit} noValidate>
      {renderFields(form, onChange)}
      <Button type={EButtonType.Submit}>{submitButtonTitle}</Button>
    </form>
  </header>
);

const renderHelper: TRenderHelper = (text, link) => (
  <div className="auth__helper">
    <p className="auth__helper-text">
      {`${text} `}
      <MemoLink to={link.href} className="auth__helper-link">
        {link.title}
      </MemoLink>
    </p>
  </div>
);

export const AuthLayout: FC<IProps> = ({
  helper: { text, link },
  ...otherProps
}) => (
  <div className="auth">
    <div className="auth__container">
      {renderContent(otherProps)}
      {renderHelper(text, link)}
    </div>
  </div>
);

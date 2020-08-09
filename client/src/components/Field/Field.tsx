import React, { FC } from 'react';

import { TOnChange, IFormField } from './Field.types';

import './Field.style.scss';

interface IProps extends IFormField {
  type?: string;
  onChange: TOnChange;
}

export const Field: FC<IProps> = ({
  label,
  value,
  type = 'text',
  disabled = false,
  required = false,
  onChange,
}) => {
  const customLabel = required ? `${label} *` : label;

  return (
    <div className="field">
      <label className="field__label">
        <input
          className="field__input"
          type={type}
          disabled={disabled}
          required={required}
          value={value}
          onChange={({ target: { value } }) => onChange(value)}
        />
        <span className="field__label-name">{customLabel}</span>
      </label>
    </div>
  );
};

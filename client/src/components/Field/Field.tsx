import React, { FC, memo } from 'react';

import { TOnChange, IFormField } from './Field.types';

import './Field.style.scss';

interface IProps extends IFormField {
  type?: string;
  onChange: TOnChange;
}

export const Field: FC<IProps> = memo(
  ({
    label,
    value,
    error,
    type = 'text',
    disabled = false,
    required = false,
    onChange,
  }) => {
    const okHelperClassName = value.trim() ? 'field__helper--ok' : '';
    const helperClassName = `field__helper ${
      !!error ? 'field__helper--error' : okHelperClassName
    }`;

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
          <span className="field__label-name">{label}</span>
        </label>
        <span className={helperClassName} />
      </div>
    );
  },
);

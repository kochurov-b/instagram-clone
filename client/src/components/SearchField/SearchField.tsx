import React, { FC } from 'react';

import { TOnChange } from './SearchField.types';
import './SearchField.style.scss';

type TProps = {
  value: string;
  onChange: TOnChange;
};

export const SearchField: FC<TProps> = ({ value, onChange }) => (
  <div className="search-field">
    <input
      type="text"
      className="search-field__input"
      placeholder="Search"
      value={value}
      onChange={({ target: { value } }) => onChange(value)}
    />
  </div>
);

import React, { FC, memo } from 'react';
import { ReactNode } from 'react';

import { EType } from './Button.types';
import './Button.style.scss';

interface IProps {
  children: ReactNode;
  type?: EType;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: FC<IProps> = memo(
  ({ type = EType.Button, disabled = false, children, onClick }) => (
    <button
      type={type}
      className="button"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  ),
);

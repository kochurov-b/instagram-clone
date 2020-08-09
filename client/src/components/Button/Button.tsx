import React, { FC } from 'react';

import './Button.style.scss';

interface IProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: FC<IProps> = ({
  type = 'button',
  disabled = false,
  children,
  onClick,
}) => (
  <button type={type} className="button" disabled={disabled} onClick={onClick}>
    {children}
  </button>
);

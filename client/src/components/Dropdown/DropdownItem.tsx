import React, { FC } from 'react';

import './Dropdown.style.scss';

type TProps = {
  onClick?: () => void;
};

export const DropdownItem: FC<TProps> = ({ children, onClick }) => (
  <div className="dropdown__menu-item" onClick={onClick}>
    {children}
  </div>
);

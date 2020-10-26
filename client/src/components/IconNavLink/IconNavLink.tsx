import React, { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';

import { TProps } from './IconNavLink.types';
import './IconNavLink.style.scss';

export const IconNavLink: FC<TProps> = memo(({ path, exact, icon: Icon }) => (
  <NavLink
    to={path}
    exact={exact}
    activeClassName="icon-link--active"
    className="icon-link"
  >
    <Icon />
  </NavLink>
));

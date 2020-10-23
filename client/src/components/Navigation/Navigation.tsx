import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { SearchField } from '../SearchField/SearchField';
import { TOnChange as TOnChangeSearch } from '../SearchField/SearchField.types';
import { LOGIN, REGISTER, ROOT } from '../../routes/routes.config';
import { TAction } from './Navigation.types';

import './Navigation.style.scss';

type TProps = {
  isAuthenticated: boolean;
  actions: TAction[];
  searchValue: string;
  onChangeSearch: TOnChangeSearch;
};

type TRenderAction = (action: TAction) => JSX.Element;

type TRenderActionList = (actions: TAction[]) => JSX.Element;

const renderAction: TRenderAction = ({
  icon,
  path,
  exact,
  component: Component,
}) => (
  <li key={path} className="actions__item">
    <Component icon={icon} path={path} exact={exact} />
  </li>
);

const renderActionList: TRenderActionList = (actions) => (
  <ul className="actions">{actions.map(renderAction)}</ul>
);

const renderAuthLinks = () => (
  <div className="auth-links">
    <Link to={LOGIN} className="auth-links__link auth-links__link--login">
      Log In
    </Link>
    <Link to={REGISTER} className="auth-links__link auth-links__link--register">
      Sign Up
    </Link>
  </div>
);

export const Navigation: FC<TProps> = ({
  isAuthenticated,
  actions,
  searchValue,
  onChangeSearch,
}) => (
  <nav className="navigation">
    <div className="navigation__content">
      <div className="logo">
        <Link to={ROOT} className={'logo__link'} />
      </div>
      <div className="search">
        <SearchField value={searchValue} onChange={onChangeSearch} />
      </div>
      {isAuthenticated ? renderActionList(actions) : renderAuthLinks()}
    </div>
  </nav>
);

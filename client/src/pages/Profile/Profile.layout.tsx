import React, { FC } from 'react';

import { TCounter } from './Profile.types';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { ReactComponent as Options } from '../../assets/images/options.svg';
import { TLogout } from '../../hooks/fetch/fetch.types';
import { DropdownItem } from '../../components/Dropdown/DropdownItem';

import './Profile.style.scss';

type TProps = {
  username: string;
  fullName: string;
  counters: TCounter[];
  logout: TLogout;
};

type TRenderUserInfo = (args: TProps) => JSX.Element;

type TRenderUserInfoCounter = (counter: TCounter) => JSX.Element;

type TRenderUserInfoCounters = (counters: TCounter[]) => JSX.Element;

type TRenderHeader = (username: string, logout: TLogout) => JSX.Element;

const renderHeader: TRenderHeader = (username, logout) => (
  <header className="user-info__header">
    <h1 className="user-info__username">{username}</h1>
    <Dropdown as={<Options />}>
      <DropdownItem onClick={logout}>Log Out</DropdownItem>
    </Dropdown>
  </header>
);

const renderUserInfoCounter: TRenderUserInfoCounter = ({ name, count }) => (
  <li key={name} className="user-info__counters-item">
    <span>{count}</span> {name}
  </li>
);

const renderUserInfoCounters: TRenderUserInfoCounters = (counters) => (
  <ul className="user-info__counters">{counters.map(renderUserInfoCounter)}</ul>
);

const renderUserInfo: TRenderUserInfo = ({
  username,
  fullName,
  counters,
  logout,
}) => (
  <div className="user-info">
    {renderHeader(username, logout)}
    {renderUserInfoCounters(counters)}
    <span className="user-info__full-name">{fullName}</span>
  </div>
);

export const ProfileLayout: FC<TProps> = (props) => {
  const { username } = props;

  return (
    <section className="profile">
      <header className="profile__header">
        <div className="profile__avatar">
          <img src="" alt={username} className="profile__avatar-img" />
        </div>
        {renderUserInfo(props)}
      </header>
    </section>
  );
};

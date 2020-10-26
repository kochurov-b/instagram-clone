import React, { FC } from 'react';

import { TCounter } from './Profile.types';

import './Profile.style.scss';

type TProps = {
  username: string;
  fullName: string;
  counters: TCounter[];
};

type TRenderUserInfo = (args: TProps) => JSX.Element;

type TRenderUserInfoCounter = (counter: TCounter) => JSX.Element;

type TRenderUserInfoCounters = (counters: TCounter[]) => JSX.Element;

const renderUserInfoCounter: TRenderUserInfoCounter = ({ name, count }) => (
  <li key={name} className="user-info__counters-item">
    <span>{count}</span> {name}
  </li>
);

const renderUserInfoCounters: TRenderUserInfoCounters = (counters) => (
  <ul className="user-info__counters">{counters.map(renderUserInfoCounter)}</ul>
);

const renderUserInfo: TRenderUserInfo = ({ username, fullName, counters }) => (
  <div className="user-info">
    <h1 className="user-info__username">{username}</h1>
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

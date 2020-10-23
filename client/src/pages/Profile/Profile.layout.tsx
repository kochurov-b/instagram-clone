import React, { FC } from 'react';

import './Profile.style.scss';

type TProps = {};

const renderUserInfoCounter = () => (
  <li className="user-info__counters-item">
    <span>0</span> posts
  </li>
);

const renderUserInfoCounters = () => (
  <ul className="user-info__counters">{renderUserInfoCounter()}</ul>
);

const renderUserInfo = () => (
  <div className="user-info">
    <h1 className="user-info__login">kochurov_b</h1>
    {renderUserInfoCounters()}
    <span className="user-info__full-name">Bogdan Kochurov</span>
  </div>
);

export const ProfileLayout: FC<TProps> = () => (
  <section className="profile">
    <header className="profile__header">
      <div className="profile__avatar">
        <img src="" alt="" className="profile__avatar-img" />
      </div>
      {renderUserInfo()}
    </header>
  </section>
);

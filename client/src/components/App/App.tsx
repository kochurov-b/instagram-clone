import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Auth } from '../../pages/Auth/Auth';

import './App.scss';

export const App: FC = () => (
  <Switch>
    <Route path="/login" component={Auth} />
    <Route path="/register" component={Auth} />
  </Switch>
);

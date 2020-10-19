import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { Auth } from '../../pages/Auth/Auth';
import { clearSnackbar } from '../../store/Snackbar/Snackbar.actions';
import { TState as TStateSnackbar } from '../../store/Snackbar/Snackbar.types';
import { TAppState } from '../../store/store.types';
import { Snackbar } from '../Snackbar/Snackbar';

import './App.scss';

export const App: FC = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector<TAppState, TStateSnackbar>(
    (state) => state.snackbar,
  );

  return (
    <div className="app">
      <Switch>
        <Route path="/login" component={Auth} />
        <Route path="/register" component={Auth} />
      </Switch>
      <Snackbar
        open={open}
        message={message}
        severity={severity}
        autoHideDuration={5000}
        onClose={() => dispatch(clearSnackbar())}
      />
    </div>
  );
};

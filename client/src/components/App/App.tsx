import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Auth } from '../../pages/Auth/Auth';
import { Snackbar } from '../Snackbar/Snackbar';
import { SnackbarContext } from '../Snackbar/Snackbar.context';
import { useSnackbar } from '../Snackbar/useSnackbar';
import { AuthContext } from '../../context/Auth.context';
import { useAuth } from '../../hooks/auth/auth.hook';

import './App.scss';

export const App: FC = () => {
  const authValues = useAuth();
  const snackbarValues = useSnackbar();
  const { open, message, severity, closeSnackbar } = snackbarValues;

  return (
    <div className="app">
      <AuthContext.Provider value={authValues}>
        <SnackbarContext.Provider value={snackbarValues}>
          <Switch>
            <Route path="/login" component={Auth} />
            <Route path="/register" component={Auth} />
          </Switch>
          <Snackbar
            open={open}
            message={message}
            severity={severity}
            autoHideDuration={5000}
            onClose={closeSnackbar}
          />
        </SnackbarContext.Provider>
      </AuthContext.Provider>
    </div>
  );
};

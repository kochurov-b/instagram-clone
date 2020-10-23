import React, { FC } from 'react';

import { Snackbar } from '../Snackbar/Snackbar';
import { SnackbarContext } from '../Snackbar/Snackbar.context';
import { useSnackbar } from '../Snackbar/useSnackbar';
import { AuthContext } from '../../context/Auth.context';
import { useAuth } from '../../hooks/auth/auth.hook';
import { Routes } from '../../routes/Routes';
import { ReactComponent as Loader } from '../../assets/images/loader.svg';

import './App.scss';

export const App: FC = () => {
  const authValues = useAuth();
  const snackbarValues = useSnackbar();
  const { isAuthenticated, userDataReady } = authValues;
  const { open, message, severity, closeSnackbar } = snackbarValues;

  if (!userDataReady)
    return (
      <div className="app">
        <Loader />
      </div>
    );

  return (
    <div className="app">
      <AuthContext.Provider value={authValues}>
        <SnackbarContext.Provider value={snackbarValues}>
          <Routes isAuthenticated={isAuthenticated} />
        </SnackbarContext.Provider>
      </AuthContext.Provider>
      <Snackbar
        open={open}
        message={message}
        severity={severity}
        autoHideDuration={5000}
        onClose={closeSnackbar}
      />
    </div>
  );
};

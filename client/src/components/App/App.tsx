import React, { FC } from 'react';

import { Snackbar } from '../Snackbar/Snackbar';
import { SnackbarContext } from '../Snackbar/Snackbar.context';
import { useSnackbar } from '../Snackbar/useSnackbar';
import { AuthContext } from '../../context/Auth.context';
import { useAuth } from '../../hooks/auth/auth.hook';
import { useRoutes } from '../../routes/routes.hook';
import { ReactComponent as Loader } from '../../assets/images/loader.svg';

import './App.scss';

export const App: FC = () => {
  const authValues = useAuth();
  const snackbarValues = useSnackbar();
  const { isAuthenticated, userDataReady } = authValues;
  const { open, message, severity, closeSnackbar } = snackbarValues;
  const { routes } = useRoutes(isAuthenticated);

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
          {routes}
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

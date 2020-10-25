import React, { FC, useReducer } from 'react';

import { Snackbar } from '../Snackbar/Snackbar';
import { SnackbarContext } from '../Snackbar/Snackbar.context';
import { useSnackbar } from '../Snackbar/useSnackbar';
import { AuthContext } from '../../context/Auth.context';
import { useAuth } from '../../hooks/auth/auth.hook';
import { Routes } from '../../routes/Routes';
import { ReactComponent as Loader } from '../../assets/images/loader.svg';
import { INITIAL_STATE, reducer } from '../../store/store';
import { StoreContext } from '../../store/store.context';
import { TReducer } from '../../store/store.types';
import { useLogger } from '../../store/store.hook';

import './App.scss';

export const App: FC = () => {
  const { reducerWithLogger } = useLogger(reducer);
  const [state, dispatch] = useReducer<TReducer>(
    reducerWithLogger,
    INITIAL_STATE,
  );
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
        <StoreContext.Provider value={{ state, dispatch }}>
          <SnackbarContext.Provider value={snackbarValues}>
            <Routes isAuthenticated={isAuthenticated} />
          </SnackbarContext.Provider>
        </StoreContext.Provider>
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

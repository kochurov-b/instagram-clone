import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Auth } from '../../pages/Auth/Auth';
import { Snackbar } from '../Snackbar/Snackbar';
import { SnackbarContext } from '../Snackbar/Snackbar.context';
import { useSnackbar } from '../Snackbar/useSnackbar';

import './App.scss';

export const App: FC = () => {
  const {
    open,
    message,
    severity,
    openSnackbar,
    closeSnackbar,
  } = useSnackbar();

  return (
    <div className="app">
      <SnackbarContext.Provider
        value={{
          open,
          message,
          severity,
          openSnackbar,
          closeSnackbar,
        }}
      >
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
    </div>
  );
};

import { ESeverity } from '../../components/Snackbar/Snackbar.types';
import { ESnackbar } from './Snackbar.constants';

type TOpenSnackbarAction = {
  type: ESnackbar.Open;
  payload: {
    message: string;
    severity?: ESeverity;
  };
};

type TClearSnackbarAction = {
  type: ESnackbar.Clear;
};

type TOpenSnackbar = (
  message: string,
  severity?: ESeverity,
) => TOpenSnackbarAction;

export type TActions = TOpenSnackbarAction | TClearSnackbarAction;

export const openSnackbar: TOpenSnackbar = (message, severity) => ({
  type: ESnackbar.Open,
  payload: {
    message,
    severity,
  },
});

export const clearSnackbar = (): TClearSnackbarAction => ({
  type: ESnackbar.Clear,
});

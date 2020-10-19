import { ESeverity } from '../../components/Snackbar/Snackbar.types';

export type TState = {
  open: boolean;
  message: string;
  severity?: ESeverity;
};

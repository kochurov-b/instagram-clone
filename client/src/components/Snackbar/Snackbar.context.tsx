import { createContext } from 'react';

import { ESeverity } from './Snackbar.types';
import { IUseSnackbarExpected } from './Snackbar.types';

export const SnackbarContext = createContext<IUseSnackbarExpected>({
  open: false,
  message: '',
  severity: ESeverity.Success,
  closeSnackbar: () => {},
  openSnackbar: () => {},
});

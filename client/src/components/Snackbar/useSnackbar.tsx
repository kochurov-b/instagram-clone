import { useCallback, useState } from 'react';

import {
  ESeverity,
  IUseSnackbarExpected,
  TOpenSnackbar,
} from './Snackbar.types';

export const useSnackbar = (): IUseSnackbarExpected => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [severity, setSeverity] = useState<ESeverity>(ESeverity.Success);

  const openSnackbar: TOpenSnackbar = useCallback(
    ({ open, message, severity }) => {
      setOpen(() => open);
      setMessage(() => message);
      setSeverity(() => severity);
    },
    [],
  );

  const closeSnackbar = () => {
    setOpen(() => false);
  };

  return { open, message, severity, openSnackbar, closeSnackbar };
};

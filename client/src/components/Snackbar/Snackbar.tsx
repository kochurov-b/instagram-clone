import React, { FC, useEffect } from 'react';

import { ESeverity } from './Snackbar.types';

import './Snackbar.style.scss';

type TProps = {
  open: boolean;
  message: string;
  severity?: ESeverity;
  autoHideDuration?: number;
  onClose: () => void;
};

const severityClassFactory = {
  [ESeverity.Error]: 'error',
  [ESeverity.Warning]: 'warning',
  [ESeverity.Info]: 'info',
  [ESeverity.Success]: 'success',
};

export const Snackbar: FC<TProps> = ({
  open,
  message,
  severity = ESeverity.Success,
  autoHideDuration,
  onClose,
}) => {
  const snackbarVisibleClass = `snackbar${open ? ' snackbar--visible' : ''}`;
  const snackbarWithSeverity = `${snackbarVisibleClass} snackbar--${severityClassFactory[severity]}`;

  useEffect(() => {
    if (open && autoHideDuration) {
      setTimeout(() => onClose(), autoHideDuration);
    }
  }, [open, autoHideDuration, onClose]);

  return (
    <div className={snackbarWithSeverity}>
      <p className="snackbar__message">{message}</p>
      <button className="snackbar__close" onClick={onClose}></button>
    </div>
  );
};

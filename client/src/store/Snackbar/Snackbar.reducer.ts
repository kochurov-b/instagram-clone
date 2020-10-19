import { Reducer } from 'redux';
import { ESeverity } from '../../components/Snackbar/Snackbar.types';

import { TActions } from './Snackbar.actions';
import { ESnackbar } from './Snackbar.constants';
import { TState } from './Snackbar.types';

const INITIAL_STATE: TState = {
  open: false,
  message: '',
  severity: ESeverity.Success,
};

export const snackbar: Reducer<TState, TActions> = (
  state = INITIAL_STATE,
  action,
) => {
  switch (action.type) {
    case ESnackbar.Open: {
      const {
        payload: { message, severity },
      } = action;

      return { ...state, open: true, message, severity };
    }

    case ESnackbar.Clear: {
      return { ...state, open: false };
    }

    default:
      return state;
  }
};

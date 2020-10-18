import { Reducer } from 'redux';
import { authConstants } from './Auth.constants';
import { TActions, TState } from './Auth.types';

const INITIAL_STATE: TState = {
  loading: false,
};

export const auth: Reducer<TState, TActions> = (
  state = INITIAL_STATE,
  action,
) => {
  switch (action.type) {
    case authConstants.LOGIN.REQUEST: {
      return { ...state, loading: true };
    }
    case authConstants.LOGIN.SUCCESS: {
      return { ...state, loading: false };
    }
    case authConstants.LOGIN.FAILURE: {
      return { ...state, loading: false };
    }

    default:
      return state;
  }
};

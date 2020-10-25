import { TReducer, TState } from './store.types';
import { EUserConstant } from './User/User.constants';
import { USER_INITIAL_STATE } from './User/User.state';

export const INITIAL_STATE: TState = {
  user: USER_INITIAL_STATE,
};

export const reducer: TReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EUserConstant.SetUserInfo: {
      const { payload } = action;

      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
      };
    }

    default:
      return state;
  }
};

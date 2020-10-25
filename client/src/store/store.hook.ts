import { useCallback } from 'react';

import { TReducer } from './store.types';

const FONT_WEIGHT_LOG = 'font-weight: 700;';
const PREV_STATE_STYLE = `color: #9E9E9E; ${FONT_WEIGHT_LOG}`;
const ACTION_STYLE = `color: #00A7F7; ${FONT_WEIGHT_LOG}`;
const NEXT_STATE_STYLE = `color: #47B04B; ${FONT_WEIGHT_LOG}`;

type TUseLogger = (
  reducer: TReducer,
) => {
  reducerWithLogger: TReducer;
};

export const useLogger: TUseLogger = (reducer) => {
  const reducerWithLogger: TReducer = useCallback(
    (state, action) => {
      const next = reducer(state, action);

      console.group('action', action.type);
      console.log('%cPrevious State:', PREV_STATE_STYLE, state);
      console.log('%cAction:', ACTION_STYLE, action);
      console.log('%cNext State:', NEXT_STATE_STYLE, next);
      console.groupEnd();

      return next;
    },
    [reducer],
  );

  return { reducerWithLogger };
};

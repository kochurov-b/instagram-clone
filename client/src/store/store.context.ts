import { createContext, Dispatch } from 'react';

import { INITIAL_STATE } from './store';
import { TActions, TState } from './store.types';

type TStoreContext = {
  state: TState;
  dispatch: Dispatch<TActions>;
};

export const StoreContext = createContext<TStoreContext>({
  state: INITIAL_STATE,
  dispatch: () => {},
});

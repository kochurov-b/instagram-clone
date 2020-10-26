import { createContext } from 'react';
import { TUseAuthExpected } from '../hooks/auth/auth.types';

export const AuthContext = createContext<TUseAuthExpected>({
  userId: null,
  token: null,
  userDataReady: false,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

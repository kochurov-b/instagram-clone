import { useCallback, useEffect, useState } from 'react';

import {
  getStorage,
  removeStorage,
  setStorage,
} from '../../utils/localStorage/localStorage';
import { EStorageName } from '../../utils/localStorage/localStorage.types';
import { TLogin, TUseAuthExpected } from './auth.types';

type TUserStorage = {
  token: string;
  userId: string;
};

export const useAuth = (): TUseAuthExpected => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userDataReady, setUserDataReady] = useState<boolean>(false);

  useEffect(() => {
    const data = getStorage<TUserStorage>(EStorageName.User);

    if (data) {
      const { token, userId } = data;

      setToken(() => token);
      setUserId(() => userId);
    }

    setUserDataReady(() => true);
  }, [setToken, setUserId]);

  const login: TLogin = useCallback((token, userId) => {
    setToken(() => token);
    setUserId(() => userId);

    setStorage(EStorageName.User, { token, userId });
  }, []);

  const logout = useCallback(() => {
    setToken(() => null);
    setUserId(() => null);

    removeStorage(EStorageName.User);
  }, []);

  return {
    isAuthenticated: !!token,
    token,
    userId,
    userDataReady,
    login,
    logout,
  };
};

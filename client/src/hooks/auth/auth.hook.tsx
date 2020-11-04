import { useCallback, useEffect, useState } from 'react';

import {
  getStorage,
  removeStorage,
  setStorage,
} from '../../utils/localStorage/localStorage';
import { EStorageName } from '../../utils/localStorage/localStorage.types';
import { TLogin, TUseAuthExpected } from './auth.types';

type TUserStorage = {
  userId: string;
};

export const useAuth = (): TUseAuthExpected => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userDataReady, setUserDataReady] = useState<boolean>(false);

  useEffect(() => {
    const data = getStorage<TUserStorage>(EStorageName.User);

    if (data) {
      const { userId } = data;

      setUserId(() => userId);
    }

    setUserDataReady(() => true);
  }, [setUserId]);

  const login: TLogin = useCallback((userId) => {
    setUserId(() => userId);

    setStorage(EStorageName.User, { userId });
  }, []);

  const logout = useCallback(() => {
    setUserId(() => null);

    removeStorage(EStorageName.User);
  }, []);

  return {
    isAuthenticated: !!userId,
    userId,
    userDataReady,
    login,
    logout,
  };
};

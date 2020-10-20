import { useEffect, useState } from 'react';

import { TLogin, TUseAuthExpected } from './auth.types';

enum ELocalStorageName {
  User = 'user',
}

export const useAuth = (): TUseAuthExpected => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userDataReady, setUserDataReady] = useState<boolean>(false);

  useEffect(() => {
    const data = localStorage.getItem(ELocalStorageName.User);

    if (data !== null) {
      const { token, userId } = JSON.parse(data);

      setToken(() => token);
      setUserId(() => userId);
    }

    setUserDataReady(() => true);
  }, [setToken, setUserId]);

  const login: TLogin = (token, userId) => {
    setToken(() => token);
    setUserId(() => userId);

    localStorage.setItem(
      ELocalStorageName.User,
      JSON.stringify({ token, userId }),
    );
  };

  const logout = () => {
    setToken(() => null);
    setUserId(() => null);

    localStorage.removeItem(ELocalStorageName.User);
  };

  return { isAuthenticated: !!token, userDataReady, userId, login, logout };
};

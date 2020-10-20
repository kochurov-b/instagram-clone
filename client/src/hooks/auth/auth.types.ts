export type TLogin = (token: string, userId: string) => void;

export type TUseAuthExpected = {
  userId: string | null;
  userDataReady: boolean;
  isAuthenticated: boolean;
  login: TLogin;
  logout: () => void;
};

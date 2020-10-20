export type TLogin = (token: string, userId: string) => void;

export type TUseAuthExpected = {
  userId: string | null;
  isAuthenticated: boolean;
  login: TLogin;
  logout: () => void;
};

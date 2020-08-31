interface IConfig {
  port: string | number;
  mongooseUri: (
    user: string | undefined,
    password: string | undefined,
  ) => string;
  jwtSecretKey: string;
}

export const config: IConfig = {
  port: process.env.PORT || 5000,
  mongooseUri: (user, password) =>
    `mongodb+srv://${user}:${password}@cluster0.fexuy.mongodb.net/test`,
  jwtSecretKey: 'secret key',
};

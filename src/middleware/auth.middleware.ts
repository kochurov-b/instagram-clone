import { Request, Response, NextFunction } from 'express';

import { EAuthMessage } from '../routes/auth/auth.types';
import { EStatusCode, TCookieParser } from '../routes/helpers/helpers.types';
import { generateJsonBody } from '../routes/helpers/jsonBody.helper';

type TAuth = (req: Request, res: Response, next: NextFunction) => void;

export const auth: TAuth = (req, res, next) => {
  if (req.method === 'OPTIONS') return next();

  try {
    const { token } = req.cookies as TCookieParser;

    if (!token) {
      return res.status(EStatusCode.Unauthorized).json(
        generateJsonBody({
          message: EAuthMessage.AuthorizationError,
          error: {
            name: EAuthMessage.AuthorizationError,
            message: EAuthMessage.AuthorizationError,
          },
        }),
      );
    }

    next();
  } catch (error) {
    return res.status(EStatusCode.Unauthorized).json(
      generateJsonBody({
        message: EAuthMessage.AuthorizationError,
        error,
      }),
    );
  }
};

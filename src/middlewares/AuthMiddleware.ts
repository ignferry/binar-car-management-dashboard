import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import { join } from 'path';
import NoTokenException from '@exceptions/NoTokenException';
import InvalidTokenException from '@exceptions/InvalidTokenException';

const JWT_PUBLIC_KEY = fs.readFileSync(
  join(__dirname, '..', '..', 'keys', 'jwt_public.key'),
);

export const authenticateToken = (
  req: Request<any>,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    next(new NoTokenException());
    return;
  }

  jwt.verify(token, JWT_PUBLIC_KEY, (err, payload) => {
    // Check if JWT token is valid
    if (err) {
      next(new InvalidTokenException());
      return;
    }
    try {
      // Check if JWT payload follows standard format
      req.user = payload as { id: string; email: string };
    } catch {
      next(new InvalidTokenException());
    }

    next();
  });
};

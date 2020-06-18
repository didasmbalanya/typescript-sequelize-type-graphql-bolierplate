import { hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { Response } from 'express';
import { TokenData } from '../../myTypes/general.types';
import env from '../../config/environment.js';
import { cookieName } from '../constants';

export const hasherFunc = async (word: string): Promise<string> => {
  const hashed = await hash(word, 10);
  return hashed;
};
const accessSecret = env.ACCESS_TOKEN_SECRET_KEY!;
const refreshSecret = env.REFRESH_TOKEN_SECRET_KEY!;

export const jwtAccessToken = (user: TokenData): string => {
  const res = sign({ email: user.email, userId: user.userId }, accessSecret, {
    expiresIn: '30m',
  });
  return res;
};

export const jwtRefreshToken = (
  userId: string | number,
  tokenVersion: number,
  expiresIn = '7d',
): string => {
  const res = sign({ userId, tokenVersion }, refreshSecret, { expiresIn });
  return res;
};

export const jwtVerifyCustom = (
  token: string,
  tokenType = 'access',
): TokenData | string => {
  const secret =
    tokenType.toLowerCase() === 'access' ? accessSecret : refreshSecret;
  return verify(token, secret);
};

export const sendRefreshToken = (
  userId: string | number,
  tokenVersion: number,
  res: Response,
) => {
  const refreshToken = jwtRefreshToken(userId, tokenVersion);
  res.cookie(cookieName, refreshToken, { path: 'refresh_token' });
};

export const expireUserRefrehTokens = (
  userId: string | number,
  service: any, // refactor to user service
  res: Response,
) => {
  res.clearCookie(cookieName);
  const result = service.incrementTokenVersion(userId);
  return result;
};

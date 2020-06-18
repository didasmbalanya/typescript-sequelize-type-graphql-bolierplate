import { Redis } from 'ioredis';
import { Response, Request } from 'express';
import { PaginatedResponse } from './pagintedResponse.type';

export interface MyContext<T = null> {
  redis?: Redis;
  req?: Request;
  url?: string;
  res?: Response;
  user?: any;
  pagintedData?: PaginatedResponse<T>;
}

export interface TokenData {
  userId?: string | number;
  role?: string;
  email?: string;
  tokenVersion?: number;
}

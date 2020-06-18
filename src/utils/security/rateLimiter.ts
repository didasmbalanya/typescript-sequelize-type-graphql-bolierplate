import { Redis } from 'ioredis';
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';

export const limiter = (redis: Redis): rateLimit.RateLimit => {
  const rL = rateLimit({
    store: new RedisStore({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      client: redis as any,
    }),
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });
  return rL;
};

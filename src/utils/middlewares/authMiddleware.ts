import { MiddlewareFn } from 'type-graphql';
import { MyContext, TokenData } from '../../myTypes/general.types';
import { noAuth, notFound } from '../constants';
import { jwtVerifyCustom } from '../security/authUtils';

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  // expects 'Bearer token`
  const { authorization } = context.req!.headers;
  if (!authorization) {
    throw new Error(noAuth);
  }
  // take the last part incase 'bearer' wasn't used
  try {
    const token = authorization.split(' ').pop()!;
    const { userId } = jwtVerifyCustom(token, 'access') as TokenData;
    if (!userId) throw Error(noAuth);
    const user = 1;
    if (!user) throw Error(notFound);

    context.user = user;
    return next();
  } catch (error) {
    throw new Error(error);
  }
};

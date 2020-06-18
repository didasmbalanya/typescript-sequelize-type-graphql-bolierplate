import { AuthChecker } from 'type-graphql';
import { ApolloError } from 'apollo-server-express';
import { MyContext, TokenData } from '../../myTypes/general.types';
import { noAuth } from '../constants';
import { jwtVerifyCustom } from '../security/authUtils';

// helper for the auth checker
export const checkExistsInArray = (
  role: string,
  roleArray: string[],
): string | boolean => {
  if (role && !roleArray.length) return true;
  const res = roleArray.find((val) => val.toLowerCase() === role.toLowerCase());
  return res;
};

export const customAuthChecker: AuthChecker<MyContext> = async (
  { context },
  roles,
) => {
  const { authorization } = context.req.headers;
  if (!authorization) {
    throw new Error(noAuth);
  }

  try {
    const token = authorization.split(' ').pop();
    const { userId } = jwtVerifyCustom(
      token.toString(),
      'access',
    ) as TokenData;
    if (!userId) throw Error(noAuth);

    // check if user role is in the array passed

    return !!roles; // or false if access is denied
  } catch (e) {
    throw new ApolloError(e);
  }
};

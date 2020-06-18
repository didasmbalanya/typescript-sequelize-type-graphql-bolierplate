import { sanitize } from 'class-sanitizer';
import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../../myTypes/general.types';

export const preSanitize = (argName: string): MiddlewareFn<MyContext> => {
  const res: MiddlewareFn<MyContext> = ({ args }, next) => {
    sanitize(args[argName]);
    return next();
  };

  return res;
};

import { Model } from 'sequelize-typescript';
import { Includeable, WhereOptions } from 'sequelize';
import { PaginatedResponse } from '../../myTypes/pagintedResponse.type';
import { BaseService } from '../services/base.service';

export const paginate = async <T extends Model<T>, TId extends number | string>(
  options: IPaginateOptions<T, TId>,
): Promise<PaginatedResponse<T>> => {
  const { model, include, args, where } = options;
  const { page, limit } = args;

  const results = await model.findAndCountAll({
    limit,
    requestedPage: page,
    include,
    where,
  });

  return results;
};

interface IPaginateOptions<T extends Model, TId extends number | string> {
  model: BaseService<T, TId>;
  include?: Includeable[] | null;
  args?: { page: number; limit: number };
  where?: WhereOptions;
}

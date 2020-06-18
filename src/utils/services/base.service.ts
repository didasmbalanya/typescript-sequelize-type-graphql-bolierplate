/* eslint-disable max-classes-per-file */
import { Repository, Model } from 'sequelize-typescript';
import {
  Includeable,
  FindOptions,
  Identifier,
  Transaction,
  WhereOptions,
} from 'sequelize/types';

export class RootService<T extends Model<T>> {
  protected readonly defaultPaginationLimit = 10;

  constructor(readonly model: Repository<T>) {}

  findOneByProp = async (
    option: IPropOption<T>,
    include?: Includeable[],
  ): Promise<T | null> => {
    const result = await this.model.findOne({
      include,
      where: this.createWhereOptions(option),
    });
    return result ? (result.get({ plain: true }) as T) : null;
  };

  findOrCreate = async (
    where: WhereOptions,
    t?: Transaction,
    include?: Includeable[],
  ) => {
    const result = await this.model.findOrCreate({
      where,
      transaction: t,
    });

    return result;
  };

  findManyByProp = async (option: IPropOption<T>, include?: Includeable[]) => {
    const result = await this.model.findAll<T>({
      include,
      where: this.createWhereOptions(option),
    });
    return result.map((item) => item.get({ plain: true })) as T[];
  };

  findAndCountAll = async (options: IFindAllPagination) => {
    const { limit, requestedPage, include, where } = options;
    const count = await this.model.count({ where });
    const totalPages = Math.ceil(count / limit) || 1;
    const page = this.getValidPageNumber(requestedPage, totalPages);
    const offset = (page - 1) * limit;
    const { rows } = await this.model.findAndCountAll({
      offset,
      limit,
      include,
      where,
    });
    const data = rows.map((entry) => entry.get() as T);
    return { pageMeta: { count, totalPages, page, limit }, data };
  };

  findByPk = async (primaryKey?: Identifier): Promise<T | null> => {
    const result = await this.model.findByPk<T>(primaryKey);
    return result ? (result.get({ plain: true }) as T) : null;
  };

  findAll = async (options?: FindOptions): Promise<T[]> => {
    const result = await this.model.findAll<T>(options);
    return result.map((e) => e.get({ plain: true })) as T[];
  };

  findOne = async (options?: FindOptions): Promise<T | null> => {
    const result = await this.model.findOne<T>(options);
    return result ? (result.get({ plain: true }) as T) : null;
  };

  add = async <TInterface extends Record<string, any>>(
    model: TInterface,
    t?: Transaction,
  ) => {
    const result = await this.model.create(model, { transaction: t });
    return result ? (result.get({ plain: true }) as T) : null;
  };

  protected shouldReturnUpdated(returning: IReturningOptions) {
    return returning && returning.returning;
  }

  protected getValidPageNumber(page: number, totalPages: number) {
    let thePage = page || 1;
    thePage = thePage > totalPages ? totalPages : thePage <= 0 ? 1 : thePage;
    return thePage;
  }

  protected createWhereOptions = (option: IPropOption<T>) => ({
    [String(option.prop)]: option.value,
  });
}

export class BaseService<T extends Model<T>, TId extends string | number>
  extends RootService<T>
  implements IModelService<T, TId> {
  constructor(model: Repository<T>) {
    super(model);
  }

  findById = async (
    id: TId,
    include?: Includeable[],
    attributes?: string[],
  ): Promise<T | null> => {
    const result = await this.model.findByPk(id, { include, attributes });
    return result ? (result.get({ plain: true }) as T) : null;
  };

  async update(
    id: TId | string | number,
    data: any,
    returning?: IReturningOptions,
  ) {
    const [number, [result]] = await this.model.update(
      { ...data },
      {
        where: { id },
        returning: true,
      },
    );

    if (number) return result.get() as T;
    return null;
  }

  async upsert(data: any, t?: Transaction) {
    const [result, value] = await this.model.upsert(
      { ...data },
      {
        returning: true,
        transaction: t,
      },
    );
    return { result, value };
  }

  async delete(id: any) {
    return await this.model.destroy({
      where: { id },
    });
  }
}

export interface IPropOption<T> {
  prop: keyof T | symbol;
  value: any;
}

export interface IReturningOptions {
  returning: boolean;
  include?: Includeable[];
}

export interface IPaginationOptions {
  defaultOptions?: FindOptions;
  limit?: number;
  page?: number;
}

export class PagedResult<T extends Model<T>> {
  constructor(
    public readonly data: T[],
    public readonly pageMeta: {
      page: number;
      totalPages: number;
      limit: number;
      count: number;
    },
  ) {}
}

export interface IModelService<T, TId> {
  findById(id: TId, include?: Includeable[]): Promise<T | null>;
  findAll(filter: object): Promise<T[] | null>;
}

export interface IFindAllPagination {
  limit: number;
  requestedPage: number;
  include?: Includeable[];
  where?: WhereOptions;
}

/* eslint-disable max-classes-per-file */
import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export class PageMeta {
  @Field(() => Int, { nullable: true })
  page: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  count: number;
}

@ObjectType()
export class PaginatedResponse<T> {
  @Field(() => PageMeta)
  pageMeta?: PageMeta;

  data?: T[];
}

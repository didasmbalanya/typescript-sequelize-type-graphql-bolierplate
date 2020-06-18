import { Resolver, Query } from 'type-graphql';

@Resolver()
export class RegisterResolver {
  @Query(() => Boolean, { nullable: true })
  hello() {
    return 'hey hey';
  }
}

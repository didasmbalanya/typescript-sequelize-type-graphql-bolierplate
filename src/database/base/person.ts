/* eslint-disable max-classes-per-file */
import { Model, Column, DataType } from 'sequelize-typescript';
import { Field, ObjectType } from 'type-graphql';

@ObjectType({ isAbstract: true })
export class Person<T> extends Model<T> {
  @Field({ nullable: true })
  @Column({
    type: DataType.STRING,
  })
  firstname: string;

  @Field({ nullable: true })
  @Column({
    type: DataType.STRING,
  })
  lastname: string;

  @Field()
  @Column({
    allowNull: false,
    unique: true,
    type: DataType.STRING,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  password: string;

  @Field({ nullable: true })
  @Column({
    type: DataType.STRING,
  })
  profileImage: string;

  @Column({
    defaultValue: 1,
  })
  tokenVersion: number;
}

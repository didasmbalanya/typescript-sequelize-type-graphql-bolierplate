/* eslint-disable max-classes-per-file */
import { Model, Column, DataType, BeforeValidate } from 'sequelize-typescript';
import { Field, ObjectType, ID } from 'type-graphql';
import { v4 as uuidv4 } from 'uuid';

@ObjectType({ isAbstract: true })
export class Base<T> extends Model<T> {
  @Field(() => ID)
  @Column({
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id!: number;
}

@ObjectType({ isAbstract: true })
export class BaseUUID<T> extends Model<T> {
  @BeforeValidate
  static makeUUID(instance: Model) {
    // this will be called when an instance is created or updated
    instance.id = uuidv4();
  }

  @Field(() => ID)
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    allowNull: false,
  })
  id: string;
}

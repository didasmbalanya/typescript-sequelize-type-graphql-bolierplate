import { Table, Column, DataType, HasMany } from 'sequelize-typescript';
import { ObjectType, Field } from 'type-graphql';
import { Base } from '../base/base';
import User from './user';

@ObjectType()
@Table({
  paranoid: true,
  timestamps: true,
})
export default class Role extends Base<Role> implements IRole {
  @Field()
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @Field()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @HasMany(() => User, 'role_id')
  users: User[];
}

export interface IRole {
  name: string;
  description: string;
}

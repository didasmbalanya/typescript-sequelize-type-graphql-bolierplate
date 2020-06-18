import {
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ObjectType, Field, ID } from 'type-graphql';
import { Person } from '../base/person';
import Role from './role';

@ObjectType()
@Table({
  paranoid: true,
})
export default class User extends Person<User> {
  @Field(() => ID)
  @Column({
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;

  @ForeignKey(() => Role)
  roleId: number;

  @Field(() => Role)
  @BelongsTo(() => Role)
  role: Role;
}

export interface IUser {
  id: number;
  firstname?: string;
  lastname?: string;
  email: string;
  password?: string;
  profileImage?: string;
  roleId: number;
  tokenVersion?: number;
  role?: Role;
}

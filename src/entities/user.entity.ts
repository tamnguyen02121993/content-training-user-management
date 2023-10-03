import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { Identity } from './identity';
import { UserRoles } from './user-roles.entity';

@Entity({
  name: 'users',
})
export class User extends Identity<string> {
  @Column('character varying', {
    length: 255,
    unique: true,
  })
  email: string;

  @Column('character varying', {
    length: 255,
    nullable: false,
  })
  password: string;

  @Column('character varying', {
    name: 'reset_password_token',
    nullable: true,
  })
  resetPasswordToken?: string;

  @Column('boolean', {
    name: 'is_pending',
    default: true,
  })
  isPending?: boolean;

  @Column('boolean', {
    name: 'is_disable',
    default: false,
  })
  isDisable?: boolean;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    name: 'created_at',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    name: 'updated_at',
  })
  updatedAt?: Date;

  @Column('uuid', {
    name: 'updated_by',
  })
  updatedBy?: string;

  @Column('character varying')
  firstName: string;

  @Column('character varying')
  lastName: string;

  @Column('character varying')
  globalId: string;

  @Column('character varying', {
    length: 50,
  })
  officeCode: string;

  @Column('character varying')
  country: string;

  @OneToMany(() => UserRoles, (userRole) => userRole.user)
  userRoles!: UserRoles[];
}

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { Identity } from './identity';
import { UserRoles } from './user-roles.entity';
import { RolePermissions } from './role-permissions.entity';

@Entity({
  name: 'roles',
})
export class Role extends Identity<string> {
  @Column('character varying', {
    length: 255,
  })
  name: string;

  @Column('uuid', {
    name: 'created_by',
  })
  createdBy?: string;

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

  @Column('text')
  description: string;

  @DeleteDateColumn({
    type: 'timestamp without time zone',
    name: 'deleted_at',
  })
  deletedAt?: Date;

  @OneToMany(() => UserRoles, (userRole) => userRole.role)
  userRoles: UserRoles[];

  @OneToMany(() => RolePermissions, (rolePermission) => rolePermission.role)
  rolePermissions: RolePermissions[];
}

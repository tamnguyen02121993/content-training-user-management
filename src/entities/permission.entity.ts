import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { Identity } from './identity';
import { RolePermissions } from './role-permissions.entity';
import { PermissionGroups } from './permission-groups.entity';

@Entity({
  name: 'permissions',
})
export class Permission extends Identity<string> {
  @Column('character varying', {
    length: 255,
  })
  name: string;

  @Column('text')
  description: string;

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

  @Column('character varying')
  code: string;

  @DeleteDateColumn({
    type: 'timestamp without time zone',
    name: 'deleted_at',
  })
  deletedAt?: Date;

  @OneToMany(
    () => RolePermissions,
    (rolePermission) => rolePermission.permission,
  )
  rolePermissions: RolePermissions[];

  @ManyToOne(
    () => PermissionGroups,
    (permissionGroup) => permissionGroup.permissions,
  )
  permissionGroup: PermissionGroups;
}

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';
import { Permission } from './permission.entity';

@Entity({
  name: 'role_permissions',
})
export class RolePermissions {
  @PrimaryGeneratedColumn('uuid')
  permissionId: string;

  @PrimaryGeneratedColumn('uuid')
  roleId: string;

  @ManyToOne(() => Role, (role) => role.rolePermissions)
  role: Role;

  @ManyToOne(() => Permission, (permission) => permission.rolePermissions)
  permission: Permission;
}

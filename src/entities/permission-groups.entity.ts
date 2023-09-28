import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { Identity } from './identity';
import { Permission } from './permission.entity';

@Entity({
  name: 'permission_groups',
})
export class PermissionGroups extends Identity<string> {
  @Column('character varying', {
    length: 255,
  })
  name: string;

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

  @DeleteDateColumn({
    type: 'timestamp without time zone',
    name: 'deleted_at',
  })
  deletedAt?: Date;

  @OneToMany(() => Permission, (permission) => permission)
  permissions: Permission[];
}

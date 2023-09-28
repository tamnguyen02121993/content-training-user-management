import { Column, CreateDateColumn, Entity } from 'typeorm';
import { Identity } from './identity';

@Entity({
  name: 'permission_assign_log',
})
export class PermissionAssignLog extends Identity<string> {
  @Column('json')
  changes: string;

  @Column()
  action: string;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    name: 'created_at',
  })
  createdAt?: Date;

  @Column('uuid', {
    name: 'created_by',
  })
  createdBy: string;
}

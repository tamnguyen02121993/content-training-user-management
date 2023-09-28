import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';
import { User } from './user.entity';

@Entity({
  name: 'user_roles',
})
export class UserRoles {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @PrimaryGeneratedColumn('uuid')
  roleId: string;

  @Column('timestamp without time zone', { name: 'assigned_at' })
  assignedAt: string;

  @ManyToOne(() => Role, (role) => role.userRoles)
  role: Role;

  @ManyToOne(() => User, (user) => user.userRoles)
  user: User;
}

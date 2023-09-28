import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Identity } from './identity';

@Entity({
  name: 'menus',
})
export class Menu extends Identity<string> {
  @Column('character varying')
  name: string;

  @Column('uuid', { name: 'parent_id' })
  parentId: string;

  @OneToOne(() => Menu, (menu) => menu.id)
  @JoinColumn()
  parent: Menu;

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
}

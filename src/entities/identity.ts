import { PrimaryGeneratedColumn } from 'typeorm';

export class Identity<T> {
  @PrimaryGeneratedColumn('uuid')
  id?: T;
}

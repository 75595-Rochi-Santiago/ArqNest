import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { EntityBase } from '@core/classes/base.entity';

@Entity()
export class Task extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
}

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { EntityBase } from '@core/classes/base.entity';
import { Analytic } from '@modules/analytic/entities/analytic.entity';

@Entity({ name: 'analytic_type' })
export class Type extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  is_active: boolean;

  @OneToMany(() => Analytic, (analytic) => analytic.analytic_types)
  analytics: Analytic[];
}

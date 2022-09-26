import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { EntityBase } from '@core/classes/base.entity';
import { Analytic } from '@modules/analytic/entities/analytic.entity';

@Entity({ name: 'analytic_copy' })
export class IsCopy extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reason: string;

  @Column()
  complaint_number: number;

  @OneToOne(() => Analytic, (analytic) => analytic.analytic_copy)
  analytic: Analytic;
}

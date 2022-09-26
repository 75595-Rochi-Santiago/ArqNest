import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { EntityBase } from '@core/classes/base.entity';
import { Analytic } from '@modules/analytic/entities/analytic.entity';

@Entity({ name: 'analytic_canceled' })
export class IsCanceled extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reason: string;

  @Column()
  justification: number;

  @Column()
  delivered_analytic: boolean;

  @Column()
  serial_number: number;

  @Column({ type: 'timestamp' })
  complaint_number: Date;

  @OneToOne(() => Analytic, (analytic) => analytic.analytic_canceled)
  analytic: Analytic;
}

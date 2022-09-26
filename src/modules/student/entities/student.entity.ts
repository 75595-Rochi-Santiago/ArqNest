import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { EntityBase } from '@core/classes/base.entity';
import { DocumentType } from '@core/entities/document-type.entity';
import { Analytic } from '@modules/analytic/entities/analytic.entity';

@Entity({ name: 'student' })
export class Student extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column()
  birthplace: string;

  @Column({ type: 'date' })
  birth_date: Date;

  @Column()
  document_type_id: number;

  @Column({ unique: true })
  document_number: string;

  @ManyToOne(() => DocumentType, (documentType) => documentType.students)
  @JoinColumn({ name: 'document_type_id' })
  document_type: DocumentType;

  @OneToOne(() => Analytic, (analytic) => analytic.analytic_student)
  analytic: Analytic;
}

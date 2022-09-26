import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { EntityBase } from '@core/classes/base.entity';
import { AnalyticCurriculumBox } from '@modules/analytic/entities/curriculum-box.entity';
import { Status } from '@modules/analytic/entities/status.entity';
import { Type } from '@modules/analytic/entities/type.entity';
import { IsCanceled } from '@modules/analytic/entities/is-canceled.entity';
import { IsCopy } from '@modules/analytic/entities/is-copy.entity';
import { Student } from '@modules/student/entities/student.entity';
import { StudyPlan } from '@modules/study-plan/entities/study-plan.entity';
import { Establishment } from '@modules/establishment/entities/establishment.entity';

@Entity({ name: 'analytic' })
export class Analytic extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  study_plan_id: number;

  @Column()
  student_id: number;

  @Column()
  average: number;

  @Column()
  establishment_id: number;

  @Column()
  firms: boolean;

  @Column()
  analytic_status_id: number;

  @Column({ type: 'timestamp' })
  discharge_date: Date;

  @Column({ type: 'timestamp' })
  broadcast_date: Date;

  @Column()
  matrix_number: number;

  @Column()
  act_number: number;

  @Column()
  folio_number: number;

  @Column()
  analytic_type_id: number;

  @Column()
  title: string;

  @Column({ type: 'date' })
  egress_date: Date;

  @Column()
  is_copy_id: number;

  @Column()
  is_canceled_id: number;

  @Column()
  is_active: boolean;

  @Column({ type: 'varchar', length: 256, nullable: true })
  observation: string;

  @OneToMany(
    () => AnalyticCurriculumBox,
    (analyticCurriculumBox) => analyticCurriculumBox.analytics,
  )
  analytic_curriculums: AnalyticCurriculumBox[];

  @ManyToOne(() => Status, (status) => status.analytics)
  @JoinColumn({ name: 'analytic_status_id' })
  analytic_status: Status;

  @ManyToOne(() => Type, (type) => type.analytics)
  @JoinColumn({ name: 'analytic_type_id' })
  analytic_types: Status;

  @ManyToOne(() => StudyPlan, (studyPlan) => studyPlan.study_plan_analytic)
  @JoinColumn({ name: 'study_plan_id' })
  study_plan: StudyPlan;

  @OneToOne(() => IsCanceled, (isCanceled) => isCanceled.analytic)
  @JoinColumn({ name: 'is_canceled_id' })
  analytic_canceled: IsCanceled;

  @OneToOne(() => IsCopy, (isCopy) => isCopy.analytic)
  @JoinColumn({ name: 'is_copy_id' })
  analytic_copy: Student;

  @OneToOne(() => Student, (student) => student.analytic)
  @JoinColumn({ name: 'student_id' })
  analytic_student: Student;

  @ManyToOne(() => Establishment, (establishment) => establishment.analytic)
  @JoinColumn({ name: 'establishment_id' })
  establishment: Establishment;
}

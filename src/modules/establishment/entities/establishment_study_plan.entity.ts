import { EntityBase } from '@core/classes/base.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { StudyPlan } from '@modules/study-plan/entities/study-plan.entity';
import { StudyPlanObservation } from '@modules/study-plan/entities/study-plan-observation.entity';
import { StudyPlanCurricularBox } from '@modules/study-plan/entities/study-plan-curricularBox.entity';
import { Analytic } from '@modules/analytic/entities/analytic.entity';
import { Establishment } from '@modules/establishment/entities/establishment.entity';

@Entity({ name: 'establishment_study_plan' })
export class EstablishmentStudyPlan extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  establishment_id: number;

  @Column()
  study_plan_id: number;

  @ManyToOne(() => Establishment, (establishment) => establishment.study_plan)
  @JoinColumn({ name: 'establishment_id' })
  establishment: Establishment;

  @ManyToOne(() => StudyPlan, (studyPlan) => studyPlan.establishment)
  @JoinColumn({ name: 'study_plan_id' })
  study_plan: StudyPlan;
}

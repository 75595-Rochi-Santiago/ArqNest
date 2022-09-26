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

import { StudyPlanStatus } from '@modules/study-plan/entities/study-plan-status.entity';
import { StudyPlanObservation } from '@modules/study-plan/entities/study-plan-observation.entity';
import { StudyPlanCurricularBox } from '@modules/study-plan/entities/study-plan-curricularBox.entity';
import { Analytic } from '@modules/analytic/entities/analytic.entity';
import { EstablishmentStudyPlan } from '@modules/establishment/entities/establishment_study_plan.entity';

@Entity({ name: 'study_plan' })
export class StudyPlan extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 300,
  })
  study_plan_name: string;

  @Column({
    length: 200,
  })
  amending_resolution: string;

  @Column({
    length: 220,
  })
  title: string;

  @Column({
    length: 220,
  })
  additional_title_description: string;

  @Column({
    length: 32,
  })
  equivalence_Law_26206: string;

  @Column({
    length: 52,
  })
  standard_approval: string;

  @Column({
    length: 39,
  })
  standard_ratification_judgment: string;

  @Column({
    length: 39,
  })
  number_rfifd: string;

  @Column({
    length: 40,
  })
  national_validity_granted_by: string;

  @Column({
    nullable: true,
  })
  study_plan_observation_id: number;

  @OneToOne(() => StudyPlanObservation)
  @JoinColumn({ name: 'study_plan_observation_id' })
  study_plan_observation: StudyPlanObservation;

  @OneToMany(
    () => StudyPlanCurricularBox,
    (StudyPlanCurricularBox) => StudyPlanCurricularBox.study_plan,
    { cascade: true },
  )
  study_plan_curricular_box: StudyPlanCurricularBox[];

  @OneToMany(() => Analytic, (Analytic) => Analytic.study_plan, {})
  study_plan_analytic: Analytic[];

  @OneToMany(
    () => EstablishmentStudyPlan,
    (EstablishmentStudyPlan) => EstablishmentStudyPlan.study_plan,
  )
  establishment: EstablishmentStudyPlan[];

  @Column()
  study_plan_status: string;

  //@ManyToOne(
  //    ()=>StudyPlanStatus,
  //    (studyPlanStatus)=>studyPlanStatus.study_plan,
  //    { eager: true, cascade:true}
  //)
  //study_plan_status: StudyPlanStatus
}

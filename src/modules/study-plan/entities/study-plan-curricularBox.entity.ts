import { EntityBase } from '@core/classes/base.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { StudyPlan } from '@modules/study-plan/entities/study-plan.entity';
import { AnalyticCurriculumBox } from '@modules/analytic/entities/curriculum-box.entity';

@Entity()
export class StudyPlanCurricularBox extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  level: string;

  @Column({
    length: 220,
  })
  course: string;

  @Column()
  study_plan_id: number;

  @Column()
  type: string;

  @ManyToOne(
    () => StudyPlan,
    (studyPlan) => studyPlan.study_plan_curricular_box,
  )
  @JoinColumn({ name: 'study_plan_id' })
  study_plan: StudyPlan;

  @OneToMany(
    () => AnalyticCurriculumBox,
    (analyticCurriculumBox) => analyticCurriculumBox.study_plan_curricular_box,
  )
  analytic_curricular_box: AnalyticCurriculumBox[];
}

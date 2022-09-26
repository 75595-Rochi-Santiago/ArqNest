import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { EntityBase } from '@core/classes/base.entity';
import { Analytic } from '@modules/analytic/entities/analytic.entity';
import { StudyPlanCurricularBox } from '@modules/study-plan/entities/study-plan-curricularBox.entity';

@Entity({ name: 'analytic_curriculum_box' })
export class AnalyticCurriculumBox extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  //@Column()
  //course: string;

  @Column()
  analytic_id: number;

  @Column({ type: 'float' })
  qualification: number;

  @Column()
  condition: string;

  @Column({ type: 'timestamp' })
  date: number;

  //@Column()
  //establishment_id: number;

  @Column()
  study_plan_curricular_box_id: number;

  @Column()
  is_active: boolean;

  @ManyToOne(() => Analytic, (analytic) => analytic.analytic_curriculums)
  @JoinColumn({ name: 'analytic_id' })
  analytics: Analytic;

  @ManyToOne(
    () => StudyPlanCurricularBox,
    (studyPlanCurricularBox) => studyPlanCurricularBox.analytic_curricular_box,
  )
  @JoinColumn({ name: 'study_plan_curricular_box_id' })
  study_plan_curricular_box: StudyPlanCurricularBox;
}

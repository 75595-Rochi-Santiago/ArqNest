import { EntityBase } from '@core/classes/base.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { StudyPlan } from '@modules/study-plan/entities/study-plan.entity';

@Entity()
export class StudyPlanStatus extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => StudyPlan, (studyPlan) => studyPlan.study_plan_status)
  study_plan: StudyPlan[];
}

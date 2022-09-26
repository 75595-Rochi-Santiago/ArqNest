import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StudyPlan } from '@modules/study-plan/entities/study-plan.entity';
import { StudyPlanObservation } from '@modules/study-plan/entities/study-plan-observation.entity';
import { StudyPlanStatus } from '@modules/study-plan/entities/study-plan-status.entity';
import { StudyPlanCurricularBox } from '@modules/study-plan/entities/study-plan-curricularBox.entity';
import { StudyPlanController } from '@modules/study-plan/controllers/study-plan.controller';
import { StudyPlanRepository } from '@modules/study-plan/study-plan.repository';
import { StudyPlanService } from '@modules/study-plan/services/study-plan.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StudyPlan,
      StudyPlanObservation,
      StudyPlanStatus,
      StudyPlanCurricularBox,
    ]),
  ],
  controllers: [StudyPlanController],
  providers: [StudyPlanService, StudyPlanRepository],
})
export class StudyPlanModule {}

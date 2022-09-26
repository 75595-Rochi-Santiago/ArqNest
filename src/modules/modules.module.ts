import { Module } from '@nestjs/common';

import { TaskModule } from '@modules/task/task.module';
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';
import { AuthorizationModule } from '@modules/authorization/authorization.module';
import { AnalyticModule } from '@modules/analytic/analytic.module';
import { StudentModule } from '@modules/student/student.module';
import { EstablishmentModule } from '@modules/establishment/establishment.module';
import { StudyPlanModule } from '@modules/study-plan/study-plan.module';

@Module({
  imports: [
    AuthModule,
    AuthorizationModule,
    TaskModule,
    UserModule,
    AnalyticModule,
    StudentModule,
    EstablishmentModule,
    StudyPlanModule,
  ],
})
export class ModulesModule {}

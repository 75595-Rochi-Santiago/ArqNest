import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnalyticController } from '@modules/analytic/controllers/analytic.controller';
import { Analytic } from '@modules/analytic/entities/analytic.entity';
import { AnalyticService } from '@modules/analytic/services/analytic.service';
import { AnalyticRepository } from '@modules/analytic/repositories/analytic.repository';
import { AnalyticsStatusRepository } from '@modules/analytic/repositories/analyticsStatus.repository';
import { Status } from '@modules/analytic/entities/status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Analytic, Status])],
  controllers: [AnalyticController],
  providers: [AnalyticService, AnalyticRepository, AnalyticsStatusRepository],
})
export class AnalyticModule {}

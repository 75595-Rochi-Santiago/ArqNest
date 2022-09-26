import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Status } from '@modules/analytic/entities/status.entity';

import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AnalyticsStatusRepository {
  constructor(
    @InjectRepository(Status)
    private analyticsStatusRepository: Repository<Status>,
  ) {}

  async findAllAnalyticStatus() {
    return await this.analyticsStatusRepository.find({
      select: { id: true, name: true },
      where: { is_active: true },
    });
  }
}

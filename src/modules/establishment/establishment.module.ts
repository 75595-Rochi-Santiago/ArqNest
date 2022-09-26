import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Establishment } from '@modules/establishment/entities/establishment.entity';
import { EstablishmentRepository } from '@modules/establishment/repositories/establishment.repository';
import { EstablishmentService } from '@modules/establishment/services/establishment.service';
import { EstablishmentController } from '@modules/establishment/controllers/establishment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Establishment])],
  controllers: [EstablishmentController],
  providers: [EstablishmentService, EstablishmentRepository],
  exports: [EstablishmentService],
})
export class EstablishmentModule {}

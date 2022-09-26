import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '@modules/user/user.module';
import { AuthorizationController } from '@modules/authorization/controllers/authorization.controller';
import { Role } from '@modules/authorization/entities/role.entity';
import { AuthorizationRepository } from '@modules/authorization/repositories/authorization.repository';
import { AuthorizationService } from '@modules/authorization/services/authorization.service';
import { EstablishmentModule } from '@modules/establishment/establishment.module'

@Module({
  imports: [TypeOrmModule.forFeature([Role]), UserModule, EstablishmentModule],
  providers: [AuthorizationRepository, AuthorizationService],
  exports: [],
  controllers: [AuthorizationController],
})
export class AuthorizationModule {}

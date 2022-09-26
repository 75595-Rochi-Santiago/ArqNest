import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  In,
  Connection,
  QueryRunner,
} from 'typeorm';

import { EstablishmentUser } from '@modules/establishment/entities/establishment-user.entity';
import { Role } from '@modules/authorization/entities/role.entity';
import { UserRole } from '@modules/authorization/entities/user-roles.entity';

@Injectable()
export class AuthorizationRepository {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,

    private dataSource: Connection,
  ) {}

  async findMultiplesRoles(roleIds: number[]) {
    return await this.rolesRepository.findBy({
      id: In(roleIds),
    });
  }

  async getAllRoles() {
    return await this.rolesRepository.find({
      where: {
        is_active: true,
      },
    });
  }

  async assignRoleAndEstablishment(
    userId: number,
    roleIds: number[],
    establishmentIds: number[],
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(UserRole)
        .where('user_id = :userId', { userId })
        .execute();

      await this.saveRoles(queryRunner, userId, roleIds);

      await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(EstablishmentUser)
        .where('user_id = :userId', { userId })
        .execute();

      await this.saveEstablishments(queryRunner, userId, establishmentIds);

      return await queryRunner.commitTransaction();
    } catch (err) {
      console.error('Error 66984', err);
      await queryRunner.rollbackTransaction();

      throw new InternalServerErrorException(
        `Ocurrio un error inesperado error: 66984`,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async saveRoles(queryRunner: QueryRunner, userId: number, roleIds: number[]) {
    for await (const roleId of roleIds) {
      let userRole = new UserRole();

      userRole.user_id = userId;
      userRole.role_id = roleId;
      userRole.is_active = true;

      await queryRunner.manager.getRepository(UserRole).save(userRole);
    }
  }

  async saveEstablishments(
    queryRunner: QueryRunner,
    userId: number,
    establishmentIds: number[],
  ) {
    for await (const establishmentId of establishmentIds) {
      let establishmentUser = new EstablishmentUser();

      establishmentUser.user_id = userId;
      establishmentUser.establishment_id = establishmentId;
      establishmentUser.is_active = true;

      await queryRunner.manager
        .getRepository(EstablishmentUser)
        .save(establishmentUser);
    }
  }
}

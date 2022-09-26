import { MigrationInterface, QueryRunner } from 'typeorm';

import { UserRole } from '@modules/authorization/entities/user-roles.entity';
import { ERoles } from '@modules/authorization/enums/roles.enum';
import { User } from '@modules/user/entities/user.entity';

export class dataCreateUserAdmin1656677588658 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.dataCreateUserAdmin(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  private async dataCreateUserAdmin(queryRunner: QueryRunner) {
    try {
      const user = new User();
      user.first_name = 'Admin';
      user.last_name = 'DirMOD';
      user.email = 'admin@dirmod.com';
      user.google_access_token = null;
      user.google_picture = null;
      user.is_active = true;

      const findUser = await queryRunner.manager
        .createQueryBuilder()
        .select()
        .from(User, 'user')
        .where('user.email = :email', { email: user.email })
        .execute();

      if (findUser.length === 0) {
        const savedUser = await queryRunner.manager.save(user);

        savedUser.id;
        const userRoles = new UserRole();

        userRoles.user_id = savedUser.id;
        userRoles.role_id = ERoles.SUPER_ADMIN;
        userRoles.is_active = true;

        await queryRunner.manager.save(userRoles);
      }
    } catch (error) {
      throw new Error(`Error on migration: 55842 ${error} `);
    }
  }
}

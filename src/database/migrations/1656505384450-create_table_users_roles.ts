import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableUsersRoles1656505384450 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createTableUsersRoles(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  private async createTableUsersRoles(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'users_roles',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'user_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'role_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'NOW()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );
  }
}

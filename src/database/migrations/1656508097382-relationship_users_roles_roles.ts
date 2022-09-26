import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class relationshipUsersRolesRoles1656508097382
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.relationshipUsersRolesRoles(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  private async relationshipUsersRolesRoles(queryRunner: QueryRunner) {
    await queryRunner.createForeignKey(
      'users_roles',
      new TableForeignKey({
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'roles',
        onDelete: 'SET NULL',
      }),
    );
  }
}

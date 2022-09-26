import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class relationshipUsersRolesUsers1656506854295
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.relationshipUsersRolesUsers(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  private async relationshipUsersRolesUsers(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.createForeignKey(
      'users_roles',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
      }),
    );
  }
}

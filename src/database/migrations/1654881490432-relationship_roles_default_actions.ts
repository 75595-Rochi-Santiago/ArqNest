import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class relationshipRolesDefaultActions1654881490432
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createRelationshipRolesDefaultActions(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  private async createRelationshipRolesDefaultActions(
    queryRunner: QueryRunner,
  ) {
    await queryRunner.createForeignKey(
      'default_actions',
      new TableForeignKey({
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'roles',
        onDelete: 'SET NULL',
      }),
    );
  }
}

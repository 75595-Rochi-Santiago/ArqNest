import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class relationshipEstablishmentsUsersUsers1656513893764
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.relationshipEstablishmentsUsersUsers(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  private async relationshipEstablishmentsUsersUsers(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.createForeignKey(
      'establishments_users',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
      }),
    );
  }
}

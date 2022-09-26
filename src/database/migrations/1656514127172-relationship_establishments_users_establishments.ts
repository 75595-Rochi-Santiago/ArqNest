import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class relationshipEstablishmentsUsersEstablishments1656514127172
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.relationshipEstablishmentsUsersEstablishments(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  private async relationshipEstablishmentsUsersEstablishments(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.createForeignKey(
      'establishments_users',
      new TableForeignKey({
        columnNames: ['establishment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'establishment',
        onDelete: 'SET NULL',
      }),
    );
  }
}

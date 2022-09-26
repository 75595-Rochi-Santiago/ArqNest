import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class relationshipAnalyticEstablishment1657125089432
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.relationshipAnalyticEstablishment(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  public async relationshipAnalyticEstablishment(queryRunner: QueryRunner) {
    await queryRunner.createForeignKey(
      'analytic',
      new TableForeignKey({
        columnNames: ['establishment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'establishment',
        onDelete: 'SET NULL',
      }),
    );
  }
}

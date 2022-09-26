import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class relationshipAnalyticCopy1653678756288
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.relationshipAnalyticCopy(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  private async relationshipAnalyticCopy(queryRunner: QueryRunner) {
    await queryRunner.createForeignKey(
      'analytic',
      new TableForeignKey({
        columnNames: ['is_copy_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'analytic_copy',
        onDelete: 'SET NULL',
      }),
    );
  }
}

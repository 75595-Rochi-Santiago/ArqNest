import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class relationshipAnalyticCanceled1653676967348
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.relationshipAnalyticCanceled(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  private async relationshipAnalyticCanceled(queryRunner: QueryRunner) {
    await queryRunner.createForeignKey(
      'analytic',
      new TableForeignKey({
        columnNames: ['is_canceled_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'analytic_canceled',
        onDelete: 'SET NULL',
      }),
    );
  }
}

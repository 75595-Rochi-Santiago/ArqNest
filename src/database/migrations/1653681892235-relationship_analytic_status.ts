import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class relationshipAnalyticStatus1653681892235
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.relationshipAnalyticStatus(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  private async relationshipAnalyticStatus(queryRunner: QueryRunner) {
    await queryRunner.createForeignKey(
      'analytic',
      new TableForeignKey({
        columnNames: ['analytic_status_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'analytic_status',
        onDelete: 'SET NULL',
      }),
    );
  }
}

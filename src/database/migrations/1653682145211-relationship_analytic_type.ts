import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class relationshipAnalyticType1653682145211
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.relationshipAnalyticType(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  private async relationshipAnalyticType(queryRunner: QueryRunner) {
    await queryRunner.createForeignKey(
      'analytic',
      new TableForeignKey({
        columnNames: ['analytic_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'analytic_type',
        onDelete: 'SET NULL',
      }),
    );
  }
}

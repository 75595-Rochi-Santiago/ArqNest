import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class relationshipAnalyticCurriculumBox1653676242993
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.relationshipAnalyticCurriculumBox(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  private async relationshipAnalyticCurriculumBox(queryRunner: QueryRunner) {
    await queryRunner.createForeignKey(
      'analytic_curriculum_box',
      new TableForeignKey({
        columnNames: ['analytic_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'analytic',
        onDelete: 'SET NULL',
      }),
    );
  }
}

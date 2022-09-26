import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class relationshipStudyPlanAnalytic1654782958099
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.relationshipStudyPlanAnalytic(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  public async relationshipStudyPlanAnalytic(queryRunner: QueryRunner) {
    await queryRunner.createForeignKey(
      'analytic',
      new TableForeignKey({
        columnNames: ['study_plan_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'study_plan',
        onDelete: 'SET NULL',
      }),
    );
  }
}

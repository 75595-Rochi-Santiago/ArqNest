import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class relationshipStudyPlanCurricularBox1654782958099
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.relationshipStudyPlanCurricularBox(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  public async relationshipStudyPlanCurricularBox(queryRunner: QueryRunner) {
    await queryRunner.createForeignKey(
      'study_plan_curricular_box',
      new TableForeignKey({
        columnNames: ['study_plan_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'study_plan',
        onDelete: 'SET NULL',
      }),
    );
  }
}

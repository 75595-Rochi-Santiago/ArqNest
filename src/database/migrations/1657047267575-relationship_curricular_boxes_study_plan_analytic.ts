import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class relationshipCurricularBoxesStudyPlanAnalytic1657047267575
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.relationshipCurricularBoxesStudyPlanAnalytic(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  public async relationshipCurricularBoxesStudyPlanAnalytic(
    queryRunner: QueryRunner,
  ) {
    await queryRunner.createForeignKey(
      'analytic_curriculum_box',
      new TableForeignKey({
        columnNames: ['study_plan_curricular_box_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'study_plan_curricular_box',
        onDelete: 'SET NULL',
      }),
    );
  }
}

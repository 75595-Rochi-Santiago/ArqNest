import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class relationshipStudyPlanEstablishmentStudyPlan1656355871730
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.relationshipStudyPlanEstablishmentStudyPlan(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  public async relationshipStudyPlanEstablishmentStudyPlan(
    queryRunner: QueryRunner,
  ) {
    await queryRunner.createForeignKey(
      'establishment_study_plan',
      new TableForeignKey({
        columnNames: ['study_plan_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'study_plan',
        onDelete: 'SET NULL',
      }),
    );
  }
}

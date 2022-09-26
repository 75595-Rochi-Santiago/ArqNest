import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class relationshipStudyPlanObservation1654617657032
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.relationshipStudyPlanObservation(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  public async relationshipStudyPlanObservation(queryRunner: QueryRunner) {
    await queryRunner.createForeignKey(
      'study_plan_observation',
      new TableForeignKey({
        columnNames: ['study_plan_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'study_plan',
        onDelete: 'SET NULL',
      }),
    );
  }
}

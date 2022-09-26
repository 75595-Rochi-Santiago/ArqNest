import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableStudyPlanObservation1654615522567
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createTableStudyPlanObservations(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
  private async createTableStudyPlanObservations(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'study_plan_observation',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'study_plan_id',
            type: 'integer',
          },
          {
            name: 'observation',
            type: 'varchar',
            length: '250',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'NOW()',
          },
        ],
      }),
    );
  }
}

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableStudyPlanCurricularBox1654782927909
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createTableStudyPlanCurricularBox(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  private async createTableStudyPlanCurricularBox(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'study_plan_curricular_box',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'study_plan_id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'course',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'level',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'NOW()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );
  }
}

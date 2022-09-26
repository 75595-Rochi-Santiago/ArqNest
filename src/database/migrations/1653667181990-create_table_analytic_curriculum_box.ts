import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableAnalyticCurriculumBox1653667181990
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createTableAnalyticCurriculumBox(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  private async createTableAnalyticCurriculumBox(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'analytic_curriculum_box',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
          },
          //{
          //  name: 'course',
          //  type: 'varchar',
          //  length: '256',
          //},
          {
            name: 'analytic_id',
            type: 'integer',
          },
          {
            name: 'qualification',
            type: 'float',
          },
          {
            name: 'condition',
            type: 'varchar',
            length: '256',
          },
          {
            name: 'date',
            type: 'timestamp',
            isNullable: false,
          },
          //{
          //  name: 'establishment_id',
          //  type: 'integer',
          //},
          {
            name: 'study_plan_curricular_box_id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: false,
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

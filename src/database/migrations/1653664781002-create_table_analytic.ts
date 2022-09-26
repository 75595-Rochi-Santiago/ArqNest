import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableAnalytic1653664781002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createTableAnalytic(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  private async createTableAnalytic(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'analytic',
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
            name: 'student_id',
            type: 'integer',
          },
          {
            name: 'average',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'establishment_id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'firms',
            type: 'boolean',
            default: false,
          },
          {
            name: 'analytic_status_id',
            type: 'integer',
          },
          {
            name: 'discharge_date',
            type: 'date',
            isNullable: true,
            default: null,
          },
          {
            name: 'broadcast_date',
            type: 'date',
            isNullable: false,
            default: null,
          },
          {
            name: 'matrix_number',
            type: 'integer',
          },
          {
            name: 'act_number',
            type: 'integer',
          },
          {
            name: 'folio_number',
            type: 'integer',
          },

          {
            name: 'analytic_type_id',
            type: 'integer',
          },
          {
            name: 'analytic_observation_id',
            type: 'varchar',
            isNullable: true,
            default: null,
          },
          {
            name: 'title',
            type: 'varchar',
            length: '256',
          },
          {
            name: 'egress_date',
            type: 'date',
            isNullable: true,
            default: null,
          },
          {
            name: 'is_copy_id',
            type: 'integer',
            default: null,
            isNullable: true,
            isUnique: true,
          },
          {
            name: 'is_canceled_id',
            type: 'integer',
            default: null,
            isNullable: true,
            isUnique: true,
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: false,
          },
          {
            name: 'observation',
            type: 'varchar',
            length: '256',
            isNullable: true,
            default: null,
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

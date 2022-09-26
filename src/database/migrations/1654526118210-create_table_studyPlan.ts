import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableStudyPlan1654526118210 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createTableStudyPlan(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  private async createTableStudyPlan(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'study_plan',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'study_plan_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'amending_resolution',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'additional_title_description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'equivalence_Law_26206',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'standard_approval',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'standard_ratification_judgment',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'number_rfifd',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'national_validity_granted_by',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'study_plan_observation_id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'study_plan_status',
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

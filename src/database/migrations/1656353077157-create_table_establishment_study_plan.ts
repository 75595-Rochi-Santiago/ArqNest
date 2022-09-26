import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableEstablishmentStudyPlan1656353077157
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createTableEstablishmentStudyPlan(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  private async createTableEstablishmentStudyPlan(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'establishment_study_plan',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'establishment_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'study_plan_id',
            type: 'int',
            isNullable: false,
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

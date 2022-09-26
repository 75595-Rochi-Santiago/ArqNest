import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableAnalyticType1653671134322
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    this.createTableAnalyticType(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  private async createTableAnalyticType(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'analytic_type',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '256',
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

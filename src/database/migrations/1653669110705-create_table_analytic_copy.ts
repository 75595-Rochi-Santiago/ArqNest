import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableAnalyticCopy1653669110705
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createTableAnalyticCopy(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  private async createTableAnalyticCopy(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'analytic_copy',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'reason',
            type: 'varchar',
            length: '256',
          },
          {
            name: 'complaint_number',
            type: 'integer',
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

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableAnalyticCanceled1653668332672
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createTableAnalyticCanceled(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  private async createTableAnalyticCanceled(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'analytic_canceled',
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
            name: 'justification',
            type: 'integer',
          },
          {
            name: 'delivered_analytic',
            type: 'boolean',
            default: false,
          },
          {
            name: 'serial_number',
            type: 'integer',
          },
          {
            name: 'complaint_number',
            type: 'timestamp',
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

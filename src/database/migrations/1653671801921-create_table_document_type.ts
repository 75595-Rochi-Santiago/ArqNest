import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableDocumentType1653671801921
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createTableDocumentType(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  private async createTableDocumentType(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'document_type',
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
            length: '128',
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

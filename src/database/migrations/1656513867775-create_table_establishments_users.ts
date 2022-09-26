import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableEstablishmentsUsers1656513867775
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createTableEstablishmentsUsers(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  private async createTableEstablishmentsUsers(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'establishments_users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'user_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'establishment_id',
            type: 'integer',
            isNullable: false,
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

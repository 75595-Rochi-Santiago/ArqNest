import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableUsers1654607739712 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createTableUsers(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  private async createTableUsers(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '128',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'first_name',
            type: 'varchar',
            length: '54',
            isNullable: false,
          },
          {
            name: 'last_name',
            type: 'varchar',
            length: '54',
            isNullable: true,
          },
          {
            name: 'google_picture',
            type: 'varchar',
            length: '256',
            isNullable: true,
          },
          {
            name: 'google_access_token',
            type: 'varchar',
            length: '512',
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

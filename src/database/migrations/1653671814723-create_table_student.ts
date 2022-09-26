import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableStudent1653671814723 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createTableStudent(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  private async createTableStudent(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'student',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'name',
            type: 'text',
          },
          {
            name: 'last_name',
            type: 'text',
          },
          {
            name: 'birthplace',
            type: 'varchar',
            length: '128',
          },
          {
            name: 'birth_date',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'document_type_id',
            type: 'integer',
          },
          {
            name: 'document_number',
            type: 'varchar',
            length: '64',
            isUnique: true
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

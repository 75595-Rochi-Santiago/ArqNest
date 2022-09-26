import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableEstablishment1654267906658
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createTableEstablishment(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  private async createTableEstablishment(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'establishment',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'situation',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'jurisdictional_regulation',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'educational_portfolio',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'management',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'area_or_department',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'cue',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'annexed',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'establishment_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'turn',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'province',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'city',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'postal_code',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'address',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'study_plan',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'mail',
            type: 'varchar',
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

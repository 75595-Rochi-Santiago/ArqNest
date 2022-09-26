import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableRoles1654880557043 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createTableRoles(queryRunner);
    await this.setRoles(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  private async createTableRoles(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'roles',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '64',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            length: '128',
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

  private async setRoles(queryRunner: QueryRunner) {
    await queryRunner.query(
      `INSERT INTO "roles" ("name", "description", "is_active") 
          VALUES 
              ('EQUIPO DE CONDUCCION', 'EQUIPO DE CONDUCCION', true),
              ('CANCELADAS', 'CANCELADAS', true),
              ('FIRMA AUTORIZADA', 'FIRMA AUTORIZADA', true),
              ('AUTORIDAD DE LEGALIZACION', 'AUTORIDAD DE LEGALIZACION', true),
              ('ADMINISTRADOR', 'ADMINISTRADOR', true),
              ('SUPER ADMIN', 'SUPER ADMIN', true)
        `,
    );
  }
}

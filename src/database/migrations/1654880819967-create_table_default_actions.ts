import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableDefaultRoles1654880819967
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createTableDefaultRoles(queryRunner);
    await this.setDefaultRoles(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  private async createTableDefaultRoles(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'default_actions',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'role_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'resource',
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

  private async setDefaultRoles(queryRunner: QueryRunner) {
    await queryRunner.query(
      `INSERT INTO "default_actions" ("role_id", "resource", "is_active")
          VALUES
              (1, 'create:StudyPlan', true),
              (1, 'update:StudyPlan', true),
              (1, 'read:StudyPlan', true),
              (1, 'associate:StudyPlan', true),
              (1, 'requestApproval:StudyPlan', true),
              (1, 'create:Analytic', true),
              (1, 'update:Analytic', true),
              (1, 'sign:Analytic', true),
              (1, 'read:Historical', true),
              (1, 'update:Historical', true),
              (2, 'create:Establishment', true),
              (2, 'update:Establishment', true),
              (2, 'create:User', true),
              (2, 'update:User', true),
              (2, 'delete:User', true),
              (2, 'create:StudyPlan', true),
              (2, 'update:StudyPlan', true),
              (2, 'read:StudyPlan', true),
              (2, 'associate:StudyPlan', true),
              (2, 'requestApproval:StudyPlan', true),
              (2, 'create:Analytic', true),
              (2, 'update:Analytic', true),
              (2, 'sign:Analytic', true),
              (2, 'read:Historical', true),
              (2, 'update:Historical', true),
              (3, 'update:Analytic', true),
              (3, 'sign:Analytic', true),
              (4, 'create:User', true),
              (4, 'update:User', true),
              (4, 'delete:User', true),
              (4, 'update:StudyPlan', true),
              (4, 'Approval:StudyPlan', true),
              (4, 'update:Analytic', true),
              (4, 'create:Print', true),
              (4, 'update:Print', true),
              (4, 'delete:Print', true),
              (4, 'update:Historical', true),
              (5, 'ADMINISTRADOR', true),
              (5, 'create:User', true),
              (5, 'update:User', true),
              (5, 'delete:User', true),
              (5, 'update:StudyPlan', true),
              (5, 'update:Analytic', true),
              (5, 'update:Print', true),
              (5, 'update:Historical', true),
              (5, 'read:Historical', true),
              (5, 'createManagerLegalizationAuthority:User', true),
              (6, 'create:Establishment', true),
              (6, 'read:Establishment', true),
              (6, 'readUnique:Establishment', true),
              (6, 'update:Establishment', true),
              (6, 'delete:Establishment', true),
              (6, 'create:User', true),
              (6, 'update:User', true),
              (6, 'delete:User', true),
              (6, 'create:StudyPlan', true),
              (6, 'update:StudyPlan', true),
              (6, 'read:StudyPlan', true),
              (6, 'requestApproval:StudyPlan', true),
              (6, 'approval:StudyPlan', true),
              (6, 'create:Analytic', true),
              (6, 'update:Analytic', true),
              (6, 'sign:Analytic', true),
              (6, 'create:Print', true),
              (6, 'update:Print', true),
              (6, 'delete:Print', true),
              (6, 'createManagerLegalizationAuthority:User', true),
              (6, 'createLegalizationAuthority:User', true),
              (6, 'create:Task', true),
              (6, 'read:Task', true),
              (6, 'readUnique:Task', true),
              (6, 'update:Task', true),
              (6, 'delete:Task', true),
              (6, 'read:Analytic', true),
              (6, 'readUnique:StudyPlan', true)

        `,
    );
  }
}

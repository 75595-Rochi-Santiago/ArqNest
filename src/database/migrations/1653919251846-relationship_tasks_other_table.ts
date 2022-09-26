import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class relationshipTasksOtherTable1653919251846
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.relationshipTasksOtherTable(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  private async relationshipTasksOtherTable(queryRunner: QueryRunner) {
    // insert relationship here
  }
}

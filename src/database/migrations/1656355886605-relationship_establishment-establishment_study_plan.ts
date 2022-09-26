import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class relationshipEstablishmentEstablishmentStudyPlan1656355886605
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.relationshipEstablishmentEstablishmentStudyPlan(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  public async relationshipEstablishmentEstablishmentStudyPlan(
    queryRunner: QueryRunner,
  ) {
    await queryRunner.createForeignKey(
      'establishment_study_plan',
      new TableForeignKey({
        columnNames: ['establishment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'establishment',
        onDelete: 'SET NULL',
      }),
    );
  }
}

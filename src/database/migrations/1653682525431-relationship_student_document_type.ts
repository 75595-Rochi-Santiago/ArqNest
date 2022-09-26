import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class relationshipStudentDocumentType1653682525431
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.relationshipStudentDocumentType(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  private async relationshipStudentDocumentType(queryRunner: QueryRunner) {
    await queryRunner.createForeignKey(
      'student',
      new TableForeignKey({
        columnNames: ['document_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'document_type',
        onDelete: 'SET NULL',
      }),
    );
  }
}

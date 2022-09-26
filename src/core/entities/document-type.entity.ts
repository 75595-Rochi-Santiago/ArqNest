import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { EntityBase } from '@core/classes/base.entity';
import { Student } from '@modules/student/entities/student.entity';

@Entity({ name: 'document_type' })
export class DocumentType extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  is_active: boolean;

  @OneToMany(() => Student, (student) => student.document_type)
  students: Student[];
}

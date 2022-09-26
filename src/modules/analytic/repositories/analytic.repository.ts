import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';

import { Student } from '@modules/student/entities/student.entity';
import { Analytic } from '@modules/analytic/entities/analytic.entity';
import { CreateAnalyticStudentDto } from '@modules/analytic/dto/create-analytic-student.dto';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AnalyticRepository {
  constructor(
    private dataSource: Connection,
    @InjectRepository(Analytic)
    private analyticsRepository: Repository<Analytic>,
  ) {}

  async findStudentsForAnalyticsByStatus(state: number) {
    const query = `
    SELECT  dt.name, s.document_number , e.cue, e.annexed ,sp.title 
    FROM analytic 
    INNER JOIN student s ON analytic.id = s.id  
    INNER JOIN document_type dt ON s.document_type_id = dt.id 
    INNER JOIN study_plan sp ON analytic.id = sp.id 
    INNER JOIN establishment_study_plan esp ON sp.id = esp.study_plan_id 
    INNER JOIN establishment e ON esp.establishment_id = e.id 
    WHERE analytic_status_id = $1 
    ORDER BY cue ASC, annexed ASC, title ASC`;
    const analytics = await this.analyticsRepository.query(query, [state]);
    return analytics;
  }

  async createAnalyticStudent(
    createAnalyticStudentDto: CreateAnalyticStudentDto,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const { student, analytic } = createAnalyticStudentDto;

    try {
      const newStudent = new Student();
      const newAnalytic = new Analytic();

      Object.assign(newAnalytic, analytic);
      Object.assign(newStudent, student);

      const { id: idStudent } = await queryRunner.manager.save(newStudent);
      newAnalytic.student_id = idStudent;
      newAnalytic.analytic_status_id = 1;

      await queryRunner.manager.save(newAnalytic);

      // commit transaction now:
      await queryRunner.commitTransaction();
      return 'Created ok';
    } catch (err) {
      console.error('Err 919', err);
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();

      throw new InternalServerErrorException(
        `Ocurrio un error inesperado error: 54684`,
      );
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release();
    }
  }

  async getAllAnalytics(
    options: IPaginationOptions,
    term: string,
  ): Promise<Pagination<Analytic>> {
    return paginate<Analytic>(
      this.analyticsRepository,
      options,
      term
        ? {
            relations: [
              'analytic_student',
              'analytic_status',
              'analytic_types',
            ],
            where: [
              {
                analytic_student: {
                  name: term,
                },
              },
              {
                analytic_student: {
                  last_name: term,
                },
              },
            ],
          }
        : {
            relations: [
              'analytic_student',
              'analytic_status',
              'analytic_types',
            ],
          },
    );
  }

  async findAnalyticByStudentDocument(documentTypeId, documentNumber) {
    return await this.analyticsRepository.find({
      relations: {
        analytic_student: { document_type: true },
        analytic_types: true,
        analytic_curriculums: { study_plan_curricular_box: true },
        establishment: true,
      },
      where: {
        analytic_student: {
          document_number: documentNumber,
          document_type_id: documentTypeId,
        },
      },
      select: {
        id: true,
        title: true,
        establishment: {
          establishment_name: true,
          cue: true,
          annexed: true,
          city: true,
        },
        analytic_student: {
          id: true,
          last_name: true,
          name: true,
          birthplace: true,
          birth_date: true,
          document_type: { id: true, name: true },
          document_number: true,
          document_type_id: true,
        },
        analytic_curriculums: {
          qualification: true,
          condition: true,
          date: true,
          study_plan_curricular_box: {
            course: true,
            level: true,
          },
        },
        observation: true,
        egress_date: true,
        average: true,
        matrix_number: true,
        act_number: true,
        folio_number: true,
        broadcast_date: true,
        analytic_types: { id: true, name: true },
        analytic_type_id: true,
      },
    });
  }
}

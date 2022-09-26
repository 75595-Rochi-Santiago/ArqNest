import { Injectable, NotFoundException } from '@nestjs/common';

import { AnalyticRepository } from '@modules/analytic/repositories/analytic.repository';
import { CreateAnalyticStudentDto } from '@modules/analytic/dto/create-analytic-student.dto';
import { GetAnalyticsDto } from '../dto/get-analytics.dto';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { IdAnalitycalStatusDto } from '@modules/analytic/dto/find-analytics-by-status';
import { AnalitycalByStudentDto } from '@modules/analytic/dto/find-analytics-by-student.dto';
import { AnalyticsStatusRepository } from '@modules/analytic/repositories/analyticsStatus.repository';

@Injectable()
export class AnalyticService {
  constructor(
    private analyticRepository: AnalyticRepository,
    private analyticsStatusRepository: AnalyticsStatusRepository,
  ) {}

  async createAnalyticStudent(
    createAnalyticStudentDto: CreateAnalyticStudentDto,
  ) {
    await this.analyticRepository.createAnalyticStudent(
      createAnalyticStudentDto,
    );
  }

  async getAllAnalytics(getAnalyticsDto: GetAnalyticsDto, route: string) {
    const { limit: limitQuery, page, term } = getAnalyticsDto;
    const limit = limitQuery > 100 ? 100 : limitQuery;

    const options: IPaginationOptions = {
      limit,
      page,
      route,
    };

    return await this.analyticRepository.getAllAnalytics(options, term);
  }

  async getStudentsForAnalyticsByStatus(
    IdAnalitycalStatus: IdAnalitycalStatusDto,
  ) {
    return await this.analyticRepository.findStudentsForAnalyticsByStatus(
      IdAnalitycalStatus.state,
    );
  }

  async getAnalyticByStudentDocument(
    studentDocumentDto: AnalitycalByStudentDto,
  ) {
    const { documentTypeId, documentNumber } = studentDocumentDto;
    const studyPlan =
      await this.analyticRepository.findAnalyticByStudentDocument(
        documentTypeId,
        documentNumber,
      );

    if (studyPlan.length === 0)
      throw new NotFoundException(
        `No se encontró un alumno con el Numero de documento: ${documentNumber} y Tipo de Documento: ${documentTypeId}`,
      );

    return await this.studyPlanRobotFormat(studyPlan[0]);
  }

  async studyPlanRobotFormat(studyPlan) {
    const data = {
      Encabezado: { Copia: studyPlan.analytic_types.name },

      Alumno: this.studyPlanStudentRobotFormat(studyPlan),

      CajaCurricular: this.studyPlanCurriculumBoxRobotFormat(
        studyPlan.analytic_curriculums,
        studyPlan.establishment.establishment_name,
      ),

      InfoTalones: this.studyPlanHeelsInfoRobotFormat(studyPlan),

      InformacionDelDorso: this.studyPlanBackInfoRobotFormat(studyPlan),
    };

    if (studyPlan.analytic_types.id === 2) delete data.InfoTalones;

    return data;
  }

  studyPlanCurriculumBoxRobotFormat(
    analytic_curriculums,
    establishment: string,
  ) {
    const data = [];

    analytic_curriculums.forEach((curriculum) => {
      data.push({
        Año_Ciclo: curriculum.study_plan_curricular_box.level,
        EspacioCurricular: curriculum.study_plan_curricular_box.course,
        Calificacion: curriculum.qualification,
        Condicion: curriculum.condition,
        Mes: curriculum.date.getDate(),
        Año: curriculum.date.getFullYear(),
        Establecimiento: establishment,
      });
    });
    return data;
  }

  studyPlanStudentRobotFormat(studyPlan) {
    return {
      Apellido: studyPlan.analytic_student.last_name,
      Nombre: studyPlan.analytic_student.name,
      LugarDeNacimiento: studyPlan.analytic_student.birthplace,
      FechaDeNacimiento: studyPlan.analytic_student.birth_date,
      TipoDeDocumento: studyPlan.analytic_student.document_type.name,
      NumeroDeDocumento: studyPlan.analytic_student.document_number,
    };
  }

  studyPlanHeelsInfoRobotFormat(studyPlan) {
    return {
      CUE: studyPlan.establishment.cue,
      Anexo: studyPlan.establishment.annexed,
      Apellido: studyPlan.analytic_student.last_name,
      Nombre: studyPlan.analytic_student.name,
      Titulo: studyPlan.title,
      FechaDeEgreso: studyPlan.egress_date,
    };
  }

  studyPlanBackInfoRobotFormat(studyPlan) {
    return {
      PromedioGeneral: studyPlan.average,
      Observaciones: studyPlan.observation,
      Apellido: studyPlan.analytic_student.last_name,
      Nombre: studyPlan.analytic_student.name,
      TipoDeDocumento: studyPlan.analytic_student.document_type.name,
      NumeroDeDocumento: studyPlan.analytic_student.document_number,
      FechaDeEgreso: studyPlan.egress_date,
      LibroMatrizNro: studyPlan.matrix_number,
      ActaNro: studyPlan.act_number,
      FolioNro: studyPlan.folio_number,
      Ciudad: studyPlan.establishment.city,
      FechaDeEmisionAnalitico: studyPlan.broadcast_date,
    };
  }

  async getAllAnalyticStatus() {
    return this.analyticsStatusRepository.findAllAnalyticStatus();
  }
}

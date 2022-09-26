import { Injectable } from '@nestjs/common';
import { readFile, utils } from 'xlsx';
import { unlink } from 'fs/promises';

import { StudyPlanRepository } from '@modules/study-plan/study-plan.repository';
import { CreateStudyPlanDto } from '@modules/study-plan/dto/create-study-plan.dto';
import { UpdateStudyPlanDto } from '@modules/study-plan/dto/update-study-plan.dto';
import { StudyPlanFilterNameDto } from '@modules/study-plan/dto/find-by-name.dto';
import { StudyPlanFilterStatusDto } from '@modules/study-plan/dto/find-by-status.dto';

@Injectable()
export class StudyPlanService {
  constructor(private studyPlanRepository: StudyPlanRepository) {}

  async getAllStudyPlans() {
    return await this.studyPlanRepository.findAll();
  }

  async getOneStudyPlanByName(studyPlanName: StudyPlanFilterNameDto) {
    return await this.studyPlanRepository.findByName(studyPlanName);
  }

  async createStudyPlan(studyPlan: any) {
    return await this.studyPlanRepository.create(studyPlan);
  }

  async updateStudyPlan(id: number, studyPlan: UpdateStudyPlanDto) {
    return await this.studyPlanRepository.update(id, studyPlan);
  }

  async createStudyPlanByExcel() {
    const path = 'data/studyPlans.xlsx';

    const exels = await this.studyPlanExcelsToJson(path);
    const studyPlans = await this.studyPlanJsonToEntityDB(exels);

    unlink(path);

    return await this.studyPlanRepository.createStudyPlanByExcel(studyPlans);
  }

  async studyPlanExcelsToJson(path: string) {
    const excel = readFile(path);
    const sheetsNames = excel.SheetNames;
    const dataStudyPlans = utils.sheet_to_json(excel.Sheets[sheetsNames[0]], {
      raw: true,
      defval: null,
    });

    const dataCurricularSpace = utils.sheet_to_json(
      excel.Sheets[sheetsNames[1]],
      { raw: true, defval: null },
    );

    return {
      dataStudyPlans,
      dataCurricularSpace,
    };
  }

  async curricularBoxJsonToEntityDB(dataCurricularSpace, study_plan) {
    const curricularBoxData = [];
    for (const assignature of dataCurricularSpace) {
      if (
        assignature['ID plan de estudio'] === study_plan['ID plan de estudio']
      ) {
        if (await this.assignatureValidateFields(assignature)) {
          curricularBoxData.push({
            level: assignature['Año'],
            course: assignature['Espacio Curricular'],
            type: assignature[`Tipo\n(AÑO/CICLO)`],
          });
        }
      }
    }
    return curricularBoxData;
  }

  async studyPlanJsonToEntityDB(excels: any) {
    const dataStudyPlans = excels.dataStudyPlans;
    const dataCurricularSpace = excels.dataCurricularSpace;
    const studyPlanData = [];

    for (const study_plan of dataStudyPlans) {
      const curricularBoxData = await this.curricularBoxJsonToEntityDB(
        dataCurricularSpace,
        study_plan,
      );

      if (await this.studyPlanValidateFields(study_plan)) {
        studyPlanData.push({
          study_plan_name: study_plan['PLAN DE ESTUDIOS'],
          title: study_plan['TÍTULO'],
          equivalence_Law_26206: study_plan['EQUIVALENCIA LEY N° 26.206'],
          standard_approval: study_plan['NORMA JURISDICCIONAL DE APROBACION'],
          national_validity_granted_by:
            study_plan['VALIDEZ NACIONAL OTORGADA POR'],
          study_plan_curricular_box: curricularBoxData,
        });
      }
    }
    return studyPlanData;
  }

  async studyPlanValidateFields(study_plan) {
    if (
      study_plan['PLAN DE ESTUDIOS'] &&
      study_plan['TÍTULO'] &&
      study_plan['EQUIVALENCIA LEY N° 26.206'] &&
      study_plan['NORMA JURISDICCIONAL DE APROBACION'] &&
      study_plan['VALIDEZ NACIONAL OTORGADA POR']
    ) {
      return true;
    }
    return false;
  }

  async assignatureValidateFields(assignature) {
    if (
      assignature['Año'] &&
      assignature['Espacio Curricular'] &&
      assignature[`Tipo\n(AÑO/CICLO)`]
    ) {
      return true;
    }
    return false;
  }
}

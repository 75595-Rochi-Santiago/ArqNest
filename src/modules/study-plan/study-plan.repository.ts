import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { StudyPlan } from '@modules/study-plan/entities/study-plan.entity';

import { StudyPlanFilterNameDto } from '@modules/study-plan/dto/find-by-name.dto'; //use entities
import { UpdateStudyPlanDto } from '@modules/study-plan/dto/update-study-plan.dto'; //use entities

export class StudyPlanRepository {
  constructor(
    @InjectRepository(StudyPlan)
    private studyPlanRepository: Repository<StudyPlan>,
  ) {}

  async findAll() {
    return await this.studyPlanRepository.find();
  }

  async findByName(studyPlanFilterName: StudyPlanFilterNameDto) {
    return await this.studyPlanRepository.find({
      relations: {
        study_plan_curricular_box: true,
      },
      select: {
        title: true,
        equivalence_Law_26206: true,
        standard_approval: true,
        amending_resolution: true,
        standard_ratification_judgment: true,
        number_rfifd: true,
        study_plan_curricular_box: { course: true, level: true, type: true },
      },
      where: { study_plan_name: studyPlanFilterName.StudyPlan },
    });
  }

  async create(createStudyPlan: StudyPlan) {
    return await this.studyPlanRepository.save(createStudyPlan);
  }

  async update(id: number, updateStudyPlan: UpdateStudyPlanDto) {
    return await this.studyPlanRepository.update(id, updateStudyPlan);
  }

  async delete(id: number) {
    return await this.studyPlanRepository.delete(id);
  }

  async createStudyPlanByExcel(studyPlan: StudyPlan[]) {
    await this.studyPlanRepository.save(studyPlan);
    return 'Excel Loaded Successfully';
  }
}

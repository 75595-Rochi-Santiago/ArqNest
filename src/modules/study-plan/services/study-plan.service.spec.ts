import { Test, TestingModule } from '@nestjs/testing';
import { StudyPlanService } from './study-plan.service';

describe('StudyPlanService', () => {
  let service: StudyPlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudyPlanService],
    }).compile();

    service = module.get<StudyPlanService>(StudyPlanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

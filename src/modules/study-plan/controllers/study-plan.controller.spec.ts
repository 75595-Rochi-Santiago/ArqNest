import { Test, TestingModule } from '@nestjs/testing';
import { StudyPlanController } from './study-plan.controller';

describe('StudyPlanController', () => {
  let controller: StudyPlanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudyPlanController],
    }).compile();

    controller = module.get<StudyPlanController>(StudyPlanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

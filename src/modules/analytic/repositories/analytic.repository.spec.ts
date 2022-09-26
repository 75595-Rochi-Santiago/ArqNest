import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticRepository } from './analytic.repository';

describe('AnalyticRepository', () => {
  let provider: AnalyticRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnalyticRepository],
    }).compile();

    provider = module.get<AnalyticRepository>(AnalyticRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

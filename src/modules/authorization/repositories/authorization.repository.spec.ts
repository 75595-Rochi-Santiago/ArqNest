import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizationRepository } from './authorization.repository';

describe('AuthorizationRepository', () => {
  let provider: AuthorizationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorizationRepository],
    }).compile();

    provider = module.get<AuthorizationRepository>(AuthorizationRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

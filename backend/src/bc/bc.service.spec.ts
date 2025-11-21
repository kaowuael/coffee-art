import { Test, TestingModule } from '@nestjs/testing';
import { BcService } from './bc.service';

describe('BcService', () => {
  let service: BcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcService],
    }).compile();

    service = module.get<BcService>(BcService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

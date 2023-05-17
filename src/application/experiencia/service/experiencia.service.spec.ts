import { Test, TestingModule } from '@nestjs/testing';
import { ExperienciaService } from './experiencia.service';

describe('ExperienciaService', () => {
  let service: ExperienciaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExperienciaService],
    }).compile();

    service = module.get<ExperienciaService>(ExperienciaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

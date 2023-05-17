import { Test, TestingModule } from '@nestjs/testing';
import { PaginaController } from './pagina.controller';

describe('PaginaController', () => {
  let controller: PaginaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaginaController],
    }).compile();

    controller = module.get<PaginaController>(PaginaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

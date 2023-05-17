import { Module } from '@nestjs/common';
import { PaginaService } from './service/pagina.service';
import { PaginaRepository } from './repository/pagina.repository';
import { PaginaController } from './controller/pagina.controller';

@Module({
  providers: [PaginaService, PaginaRepository],
  controllers: [PaginaController]
})
export class PaginaModule {}

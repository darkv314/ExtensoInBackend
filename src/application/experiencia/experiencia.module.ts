import { Module } from '@nestjs/common';
import { ExperienciaService } from './service/experiencia.service';
import { ExperienciaRepository } from './repository/experiencia.repository';

@Module({
  providers: [
    ExperienciaService,
    ExperienciaRepository
]
})
export class ExperienciaModule {}

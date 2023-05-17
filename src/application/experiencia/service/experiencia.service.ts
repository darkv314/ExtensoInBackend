import { Inject, Injectable } from '@nestjs/common';
import { ExperienciaRepository } from '../repository/experiencia.repository';
import { Experiencia } from '../entity/experiencia.entity';

@Injectable()
export class ExperienciaService {
    constructor(
        @Inject(ExperienciaRepository)
        private experienciaRepository: ExperienciaRepository
    ){}

    async saveExperience(experience: Experiencia): Promise<Experiencia>{
        return this.experienciaRepository.saveExperiencia(experience)
    }
}

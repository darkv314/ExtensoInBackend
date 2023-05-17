import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Experiencia } from "../entity/experiencia.entity";

@Injectable()
export class ExperienciaRepository {
    constructor(private dataSource: DataSource){}

    async saveExperiencia(experience: Experiencia): Promise<Experiencia>{
        return this.dataSource.getRepository(Experiencia).save(experience);
    }
}
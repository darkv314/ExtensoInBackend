import { Inject, Injectable } from '@nestjs/common';
import { PaginaRepository } from '../repository/pagina.repository';

@Injectable()
export class PaginaService {
    constructor(
        @Inject(PaginaRepository)
        private paginaRespository: PaginaRepository
    ){}

    async getPaginaByUserId(userId: number){
        return this.paginaRespository.findPaginasByUserId(userId)
    }

    async getAllPagina(){
        return this.paginaRespository.findAllPagina()
    }
}

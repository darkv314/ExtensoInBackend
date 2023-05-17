import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { PaginaUsuario } from "../entity/pagina_usuario.entity";
import { Pagina } from "../entity/pagina.entity";

@Injectable()
export class PaginaRepository {
    constructor(private dataSource: DataSource){}

    async findPaginasByUserId(userId: number){
        return this.dataSource.getRepository(Pagina)
        .createQueryBuilder('pagina')
        .innerJoinAndSelect('pagina.paginaUsuario', 'paginaUsuario')
        .where('paginaUsuario.idUsuario = :id', {id: userId})
        .getMany()
    }

    async findAllPagina(): Promise<Pagina[]>{
        return this.dataSource.getRepository(Pagina).find();
    }
}
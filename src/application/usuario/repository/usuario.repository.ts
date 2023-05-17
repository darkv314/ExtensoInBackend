import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Usuario } from "../entity/usuario.entity";

@Injectable()
export class UsuarioRepository {
    constructor(private dataSource: DataSource){}

    async userExist(email: string){
        return await this.dataSource.getRepository(Usuario).exist({where: {email: email}});
    }

    async findUserByEmail(email: string){
        return this.dataSource.getRepository(Usuario).findOneByOrFail({email: email})
    }

    async findPostulantes(postId: number): Promise<Usuario[]>{
        return this.dataSource.getRepository(Usuario)
        .createQueryBuilder('usuario')
        .innerJoinAndSelect('usuario.postUsuario', 'postUsuario')
        .where('postUsuario.idPost = :id', {id: postId})
        .select(["usuario"])
        .getMany()
    }
}
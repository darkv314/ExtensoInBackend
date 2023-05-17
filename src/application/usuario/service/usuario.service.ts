import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UsuarioRepository } from '../repository/usuario.repository';
import { Usuario } from '../entity/usuario.entity';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { Experiencia } from 'src/application/experiencia/entity/experiencia.entity';

@Injectable()
export class UsuarioService {
    constructor(
        @Inject(UsuarioRepository)
        private usuarioRepository: UsuarioRepository,
        private dataSource: DataSource
    ){}

    async saveUser(user: Usuario): Promise<Usuario> {
        const queryRunner = this.dataSource.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()
        let newUser: Usuario;
        try{
            if(!await this.usuarioRepository.userExist(user.email)){
                newUser = await queryRunner.manager.save(Usuario, user)
            }else{
                throw new HttpException('Este email ya se encuentra registrado', HttpStatus.BAD_REQUEST);
            }
            if(user.experiencia != undefined){
                await Promise.all(
                    user.experiencia.map(async experiencia => {
                      experiencia.idUsuario = newUser.id;
                      return await queryRunner.manager.save(Experiencia, experiencia)
                    })
                )
            }
            await queryRunner.commitTransaction()
        }catch(e){
            await queryRunner.rollbackTransaction()
            throw e
        }finally{
            await queryRunner.release()
        }
        return newUser
    }

    async loginUser(email: string, password: string): Promise<Usuario> {
        try{
            const user = await this.usuarioRepository.findUserByEmail(email);
            if(await bcrypt.compare(password, user.password)){
                return user;
            }
        }catch(e){
            throw new HttpException('Email incorrecto', HttpStatus.BAD_REQUEST);
        }
        throw new HttpException('Password Incorrecto', HttpStatus.BAD_REQUEST);
    }

    async getPostulantesByPost(postId: number){
        return this.usuarioRepository.findPostulantes(postId)
    }
}

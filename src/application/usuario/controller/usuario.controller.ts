import { Controller, Get, Param } from '@nestjs/common';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../entity/usuario.entity';

@Controller('usuario')
export class UsuarioController {
    constructor(
        private usuarioService: UsuarioService
    ){}

    @Get("post/:id")
    async getPostulantesByPost(@Param("id") postId: number): Promise<Usuario[]>{
        const users: Usuario[] =  await this.usuarioService.getPostulantesByPost(postId)
        return users.map((user) => {
            user.password = null;
            return user
        })
    }
}

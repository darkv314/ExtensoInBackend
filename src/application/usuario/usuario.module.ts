import { Module } from '@nestjs/common';
import { UsuarioService } from './service/usuario.service';
import { UsuarioController } from './controller/usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entity/usuario.entity';
import { UsuarioRepository } from './repository/usuario.repository';

@Module({
  providers: [
    UsuarioService,
    UsuarioRepository
  ],
  imports: [
    TypeOrmModule.forFeature([
      Usuario
    ])
  ],
  controllers: [UsuarioController]
})
export class UsuarioModule {}

import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { PaginaModule } from './pagina/pagina.module';
import { PostModule } from './post/post.module';
import { CategoriaModule } from './categoria/categoria.module';
import { ExperienciaModule } from './experiencia/experiencia.module';
import { RecomendacionModule } from './recomendacion/recomendacion.module';

@Module({
  imports: [UsuarioModule, PaginaModule, PostModule, CategoriaModule, ExperienciaModule, RecomendacionModule],
  providers: [],
  controllers: []
})
export class ApplicationModule {}

import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import * as dotenv from 'dotenv'
import { Post } from "src/application/post/entity/post.entity";
import { PaginaUsuario } from "./pagina_usuario.entity";
import { Experiencia } from "src/application/experiencia/entity/experiencia.entity";
  
  dotenv.config()
  
  @Entity({ name: "pagina", schema: process.env.DB_SCHEMA_EMPRESA })
  export class Pagina extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id: number;
  
    @Column("character varying", { name: "nombre", length: 50 })
    nombre: string;

    @Column("character varying", {name: "descripcion", length: 255})
    descripcion: string;

    @Column("character varying", { name: "url_perfil", length: 255, nullable: true, default: null })
    urlPerfil?: string;

    @Column("character varying", { name: "url_banner", length: 255, nullable: true, default: null  })
    urlBanner?: string;

    @OneToMany(
      () => Post,
      (post) => post.pagina
    )
    post: Post[]

    @OneToMany(
      () => PaginaUsuario,
      (paginaUsuario) => paginaUsuario.pagina
    )
    paginaUsuario: PaginaUsuario[]
    
    @OneToMany(
      () => Experiencia,
      (experiencia) => experiencia.pagina
    )
    experiencia: Experiencia[]
  
    constructor(data?: Partial<Pagina>) {
      super()
      if (data) Object.assign(this, data)
    }
  }
  
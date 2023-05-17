import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import * as dotenv from 'dotenv'
import { PaginaUsuario } from "src/application/pagina/entity/pagina_usuario.entity";
import { PostUsuario } from "src/application/post/entity/post_usuario.entity";
import { Recomendacion } from "src/application/recomendacion/entity/recomendacion.entity";
import { Experiencia } from "src/application/experiencia/entity/experiencia.entity";
  
  dotenv.config()
  
  @Entity({ name: "usuario", schema: process.env.DB_SCHEMA_USUARIOS })
  export class Usuario extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id: number;
  
    @Column("character varying", { name: "nombre", length: 100 })
    nombre: string;

    @Column("character varying", { name: "apellido", length: 100 })
    apellido: string;

    @Column("character varying", {name: "descripcion", length: 255})
    descripcion: string;

    @Column("date", { name: "fecha_nacimiento"})
    fechaNacimiento: Date;

    @Column("character varying", { name: "cedula_identidad", length: 20 })
    ci: string;

    @Column("character varying", { name: "url_perfil", length: 255, nullable: true, default: null })
    urlPerfil?: string;

    @Column("character varying", { name: "url_banner", length: 255, nullable: true, default: null })
    urlBanner?: string;

    @Column("character varying", { name: "skills", length: 255 })
    skills: string;

    @Column("character varying", { name: "email", length: 255 })
    email: string;

    @Column("character varying", { name: "password", length: 255 })
    password: string;

    @OneToMany(
        () => PaginaUsuario,
        (paginaUsuario) => paginaUsuario.usuario
    )
    paginaUsuario: PaginaUsuario[]

    @OneToMany(
        () => PostUsuario,
        (postUsuario) => postUsuario.usuario
    )
    postUsuario: PostUsuario[]

    @OneToMany(
        () => Recomendacion,
        (recomendacion) => recomendacion.perfil
    )
    recomendacion: Recomendacion[]

    @OneToMany(
      () => Recomendacion,
      (recomendacion) => recomendacion.remitente
    )
    remitente: Recomendacion[]

    @OneToMany(
        () => Experiencia,
        (experiencia) => experiencia.usuario
    )
    experiencia: Experiencia[]
  
    constructor(data?: Partial<Usuario>) {
      super()
      if (data) Object.assign(this, data)
    }
  }
  
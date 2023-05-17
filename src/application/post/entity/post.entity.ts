import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import * as dotenv from 'dotenv'
import { Categoria } from "src/application/categoria/entity/categoria.entity";
import { Pagina } from "src/application/pagina/entity/pagina.entity";
import { Usuario } from "src/application/usuario/entity/usuario.entity";
import { PostUsuario } from "./post_usuario.entity";
  
  dotenv.config()
  
  @Entity({ name: "post", schema: process.env.DB_SCHEMA_POSTS })
  export class Post extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id: number;
  
    @Column("character varying", { name: "url_imagen", length: 255, nullable: true, default: null })
    urlImagen?: string;
  
    @Column("character varying", { name: "descripcion", length: 255 })
    descripcion: string;

    @Column("integer", {name: "id_pagina", nullable: true, default: null})
    idPagina: number;

    @ManyToOne(() => Pagina, (pagina) => pagina.post,{
        nullable: false,
        onDelete: "CASCADE"
    })
    @JoinColumn([{name: "id_pagina", referencedColumnName: "id"}])
    pagina: Pagina;
  
    @OneToMany(
      () => Categoria,
      (categoria) => categoria.post
    )
    categoria: Categoria[]

    @OneToMany(
        () => PostUsuario,
        (postUsuario) => postUsuario.post
    )
    postUsuario: PostUsuario[]
  
    constructor(data?: Partial<Post>) {
      super()
      if (data) Object.assign(this, data)
    }
  }
  
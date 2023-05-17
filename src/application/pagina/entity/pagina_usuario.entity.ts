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
import { Pagina } from "./pagina.entity";
import { Usuario } from "src/application/usuario/entity/usuario.entity";
  
  dotenv.config()
  
  @Entity({ name: "pagina_usuario", schema: process.env.DB_SCHEMA_EMPRESA })
  export class PaginaUsuario extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id: number;

    @Column("integer", {name: "id_pagina", nullable: true, default: null})
    idPagina: number;

    @ManyToOne(() => Pagina, (pagina) => pagina.paginaUsuario,{
        nullable: false,
        onDelete: "CASCADE"
    })
    @JoinColumn([{name: "id_pagina", referencedColumnName: "id"}])
    pagina: Pagina;

    @Column("integer", {name: "id_usuario", nullable: true, default: null})
    idUsuario: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.paginaUsuario,{
        nullable: false,
        onDelete: "CASCADE"
    })
    @JoinColumn([{name: "id_usuario", referencedColumnName: "id"}])
    usuario: Usuario;
  
    constructor(data?: Partial<PaginaUsuario>) {
      super()
      if (data) Object.assign(this, data)
    }
  }
  
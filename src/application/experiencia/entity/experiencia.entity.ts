import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import * as dotenv from 'dotenv'
import { Usuario } from "src/application/usuario/entity/usuario.entity";
import { Pagina } from "src/application/pagina/entity/pagina.entity";
  
  dotenv.config()
  
  @Entity({ name: "experiencia", schema: process.env.DB_SCHEMA_USUARIOS })
  export class Experiencia extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id: number;
  
    @Column("character varying", { name: "titulo", length: 100 })
    titulo: string;

    @Column("character varying", {name: "descripcion", nullable: true, default: null})
    descripcion: string;

    @Column("integer", {name: "id_usuario"})
    idUsuario: number;

    @Column("character varying", {name: "nombre_empresa", nullable: true, default: null})
    nombreEmpresa?: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.experiencia,{
        nullable: false,
        onDelete: "CASCADE"
    })
    @JoinColumn([{name: "id_usuario", referencedColumnName: "id"}])
    usuario: Usuario;

    @Column("integer", {name: "id_pagina", nullable: true, default: null})
    idPagina?: number;

    @ManyToOne(() => Pagina, (pagina) => pagina.experiencia,{
      nullable: false,
      onDelete: "CASCADE"
  })
    @JoinColumn([{name: "id_pagina", referencedColumnName: "id"}])
    pagina: Pagina;
  
    constructor(data?: Partial<Experiencia>) {
      super()
      if (data) Object.assign(this, data)
    }
  }
  
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
  
  dotenv.config()
  
  @Entity({ name: "recomendacion", schema: process.env.DB_SCHEMA_USUARIOS })
  export class Recomendacion extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id: number;
  
    @Column("character varying", { name: "mensaje", length: 255 })
    mensaje: string;

    @Column("integer", {name: "id_perfil", nullable: true, default: null})
    idPerfil: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.recomendacion,{
        nullable: false,
        onDelete: "CASCADE"
    })
    @JoinColumn([{name: "id_perfil", referencedColumnName: "id"}])
    perfil: Usuario;

    @Column("integer", {name: "id_remitente", nullable: true, default: null})
    idRemitente: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.remitente,{
        nullable: false,
        onDelete: "CASCADE"
    })
    @JoinColumn([{name: "id_remitente", referencedColumnName: "id"}])
    remitente: Usuario;
  
    constructor(data?: Partial<Recomendacion>) {
      super()
      if (data) Object.assign(this, data)
    }
  }
  
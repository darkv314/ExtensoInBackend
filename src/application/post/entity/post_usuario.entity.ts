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
import { Usuario } from "src/application/usuario/entity/usuario.entity";
import { Post } from "./post.entity";
  
  dotenv.config()
  
  @Entity({ name: "post_usuario", schema: process.env.DB_SCHEMA_EMPRESA })
  export class PostUsuario extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id: number;

    @Column("integer", {name: "id_post", nullable: true, default: null})
    idPost: number;

    @ManyToOne(() => Post, (post) => post.postUsuario,{
        nullable: false,
        onDelete: "CASCADE"
    })

    @JoinColumn([{name: "id_post", referencedColumnName: "id"}])
    post: Post;

    @Column("integer", {name: "id_usuario", nullable: true, default: null})
    idUsuario: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.postUsuario,{
        nullable: false,
        onDelete: "CASCADE"
    })
    @JoinColumn([{name: "id_usuario", referencedColumnName: "id"}])
    usuario: Usuario;
  
    constructor(data?: Partial<PostUsuario>) {
      super()
      if (data) Object.assign(this, data)
    }
  }
  
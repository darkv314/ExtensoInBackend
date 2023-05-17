import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import * as dotenv from 'dotenv'
import { Post } from "src/application/post/entity/post.entity";
  
  dotenv.config()
  
  @Entity({ name: "categoria", schema: process.env.DB_SCHEMA_POSTS })
  export class Categoria extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id: number;
  
    @Column("character varying", { name: "nombre", length: 50 })
    nombre: string;

    @Column("integer", {name: "id_post", nullable: true, default: null})
    idPost: number;

    @ManyToOne(() => Post, (post) => post.categoria,{
        nullable: false,
        onDelete: "CASCADE"
    })
    @JoinColumn([{name: "id_post", referencedColumnName: "id"}])
    post: Post;
  
    constructor(data?: Partial<Categoria>) {
      super()
      if (data) Object.assign(this, data)
    }
  }
  
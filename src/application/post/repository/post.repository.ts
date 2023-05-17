import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Post } from "../entity/post.entity";

@Injectable()
export class PostRepository {
    constructor(private dataSource: DataSource){}

    async findAllPosts():Promise<Post[]>{
        return await this.dataSource.getRepository(Post).find()
    }

    async findPostsByCategory(categoryName: string):Promise<Post[]>{
        return await this.dataSource.getRepository(Post)
        .createQueryBuilder('post')
        .innerJoinAndSelect('post.categoria', 'categoria')
        .where('categoria.nombre = :name', {name: categoryName})
        .select('post')
        .getMany()
    }

    async createPost(post: Post):Promise<Post>{
        return await this.dataSource.getRepository(Post).save(post)
    }

    async findPostByUserId(userId: number):Promise<Post[]>{
        return this.dataSource.getRepository(Post)
        .createQueryBuilder('post')
        .innerJoinAndSelect('post.postUsuario', 'postUsuario')
        .where('postUsuario.idUsuario = :id', {id: userId})
        .select(["post"])
        .getMany()
    }
}
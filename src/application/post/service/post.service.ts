import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PostRepository } from '../repository/post.repository';
import { Post } from '../entity/post.entity';
import { DataSource } from 'typeorm';
import { PostUsuario } from '../entity/post_usuario.entity';

@Injectable()
export class PostService {
    constructor(
        @Inject(PostRepository)
        private postRepository: PostRepository,
        private dataSource: DataSource
    ){}

    async getAllPost(): Promise<Post[]>{
        return await this.postRepository.findAllPosts()
    }

    async getPostsByCategory(categoryName: string): Promise<Post[]>{
        return await this.postRepository.findPostsByCategory(categoryName)
    }

    async postular(userId: number, postId: number){
        try{
            if(!await this.dataSource.getRepository(PostUsuario).exist({where: {idPost: postId, idUsuario: userId}})){
                const postUsuario: Partial<PostUsuario> = {
                    idPost: postId,
                    idUsuario: userId
                }
                await this.dataSource.getRepository(PostUsuario).save(postUsuario)
            }else{
                throw new HttpException('Ya postulaste a este post', HttpStatus.BAD_REQUEST);
            }
        }catch(e){
            throw e;
        }
        return {
            "statusCode": HttpStatus.OK,
            "message": "Se postulo correctamente"
          }
    }

    async savePost(post: Post){
        return this.postRepository.createPost(post)
    }

    async getPostsByUserId(userId: number){
        return this.postRepository.findPostByUserId(userId)
    }
}

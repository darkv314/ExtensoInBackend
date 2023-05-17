import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { PostService } from '../service/post.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/core/authentication/guard/jwt-auth.guard';

@Controller('post')
export class PostController {
    constructor(
        private postService: PostService
    ){}

    @Get('getAll')
    async getAllPosts(){
        return await this.postService.getAllPost();
    }

    @Post('category')
    async getPostsByCategory(@Body() body: {nombre: string}){
        return await this.postService.getPostsByCategory(body.nombre);
    }

    @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
    @Post('postular/:id')
    async postular(@Req() req, @Param('id') postId){
        return await this.postService.postular(req.user.id, postId);
    }

    @Post()
    async savePost(@Body() body){
        return await this.postService.savePost(body);
    }

    @Get('user/:id')
    async getPostByUserId(@Param('id') userId: number){
        return await this.postService.getPostsByUserId(userId);
    }
}

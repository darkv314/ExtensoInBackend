import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { PaginaService } from '../service/pagina.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/core/authentication/guard/jwt-auth.guard';

@Controller('pagina')
export class PaginaController {
    constructor(
        private paginaService: PaginaService
    ){}

    @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
    @Get('user')
    async getPaginaByUserId(@Req() req){
        const user = req.user;
        return this.paginaService.getPaginaByUserId(user.id)
    }

    @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
    @Get('all')
    async getAllPagina(){
        return this.paginaService.getAllPagina()
    }
}

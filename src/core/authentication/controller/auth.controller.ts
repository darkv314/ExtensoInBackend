import { Body, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticationService } from '../service/authentication.service';
import { Usuario } from 'src/application/usuario/entity/usuario.entity';
import { UsuarioService } from 'src/application/usuario/service/usuario.service';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

@Controller('auth')
export class AuthController {
  constructor(
    private authenticationService: AuthenticationService,
    private usuarioService: UsuarioService
  ){}

  @Post('register')
  async registerUser(@Body() user: Usuario) {
    const userWithHash = user
    const saltOrRounds = 12;
    userWithHash.password = await bcrypt.hash(userWithHash.password, saltOrRounds);
    const newUser: Usuario = await this.usuarioService.saveUser(user)
    return {
      token: await this.authenticationService.generateToken(newUser.id),
      user: newUser,
    }
  }

  @Post('login')
  async login(@Body() body){
    const {email, password} = body
    const user: Usuario = await this.usuarioService.loginUser(email, password)
    return {
      token: await this.authenticationService.generateToken(user.id),
      user: user,
    }
  }
}

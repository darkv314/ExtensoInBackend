import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from "@nestjs/jwt";
import { AuthenticationService } from './service/authentication.service';
import * as dotenv from 'dotenv';
import { AuthController } from './controller/auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UsuarioService } from 'src/application/usuario/service/usuario.service';
import { UsuarioRepository } from 'src/application/usuario/repository/usuario.repository';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    })
  ],
  providers: [
    AuthenticationService, 
    ConfigService,
    JwtStrategy,
    UsuarioService,
    UsuarioRepository
  ],
  exports: [AuthenticationService],
  controllers: [AuthController]
})
export class AuthenticationModule {}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private jwtService: JwtService
  ) {}
  
  async generateToken( id: number ){
    const payload = { id: id };
    const token = this.jwtService.sign(payload);
    return token;
  }
}

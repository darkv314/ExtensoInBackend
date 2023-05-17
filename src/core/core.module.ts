import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [AuthenticationModule, ConfigModule]
})
export class CoreModule {}

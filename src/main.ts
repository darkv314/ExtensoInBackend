import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import {DataSource} from "typeorm"

dotenv.config()

export const SessionAppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: process.env.LOG_SQL === 'true',
  entities: [__dirname + '/../src/**/*.entity{.ts,.js}'],
})

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api')
  await app.listen(process.env.PORT);
}
bootstrap();

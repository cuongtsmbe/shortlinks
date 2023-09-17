/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShortLinksModule } from './shortlinks';
import {TypeOrmModule} from "@nestjs/typeorm";
import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgressql',
      port: 5432,
      username: 'u-sneaker',
      password: 'pass-sneaker',
      database: 'dbsneaker',
      entities: [path.join(process.cwd(), 'dist/**/*.entity.js')],
      synchronize: true,
    }),
    ShortLinksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

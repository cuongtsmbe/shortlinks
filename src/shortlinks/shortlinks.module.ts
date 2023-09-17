import { Module } from '@nestjs/common';
import * as controllers from './controllers';
import * as providers from './providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortLinksEntity } from '../entity/shortlinks.entity';
@Module({
  imports: [TypeOrmModule.forFeature([ShortLinksEntity])],
  providers: Object.values(providers),
  controllers: Object.values(controllers),
  exports: Object.values(providers),
})
export class ShortLinksModule {}

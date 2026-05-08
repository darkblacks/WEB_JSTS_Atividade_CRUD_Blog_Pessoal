import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Postagem } from './entities/postagem.entity';
import { Tema } from '../tema/entities/tema.entity';
import { PostagemController } from './postagem.controller';
import { PostagemService } from './postagem.service';

@Module({
  imports: [TypeOrmModule.forFeature([Postagem, Tema])],
  controllers: [PostagemController],
  providers: [PostagemService],
  exports: [PostagemService],
})
export class PostagemModule {}
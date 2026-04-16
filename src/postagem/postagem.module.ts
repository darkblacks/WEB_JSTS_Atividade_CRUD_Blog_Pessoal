import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemController } from './postagem.controller';
import { PostagemService } from './postagem.service';
import { Postagem } from './entities/postagem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Postagem])],
  controllers: [PostagemController],
  providers: [PostagemService],
})
export class PostagemModule {}
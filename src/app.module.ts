import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsuarioModule } from './usuario/usuario.module';
import { TemaModule } from './tema/tema.module';
import { PostagemModule } from './postagem/postagem.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'blog.db',
      autoLoadEntities: true,
      synchronize: true,
    }),

    UsuarioModule,
    TemaModule,
    PostagemModule,
  ],
})
export class AppModule {}
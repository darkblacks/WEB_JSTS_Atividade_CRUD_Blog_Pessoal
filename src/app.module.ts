import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsuarioModule } from './usuario/usuario.module';
import { PostagemModule } from './postagem/postagem.module';
import { TemaModule } from './tema/tema.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'blog.db',
      autoLoadEntities: true,
      synchronize: true,
    }),

    UsuarioModule,
    PostagemModule,
    TemaModule,
  ],
})
export class AppModule {}
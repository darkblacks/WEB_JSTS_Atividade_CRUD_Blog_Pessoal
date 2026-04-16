import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { PostagemModule } from './postagem/postagem.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbType = (configService.get<string>('DB_TYPE') || 'mysql') as
          | 'mysql'
          | 'postgres';

        return {
          type: dbType,
          host: configService.get<string>('DB_HOST') || 'localhost',
          port:
            Number(configService.get<string>('DB_PORT')) ||
            (dbType === 'mysql' ? 3306 : 5432),
          username:
            configService.get<string>('DB_USERNAME') ||
            (dbType === 'mysql' ? 'root' : 'postgres'),
          password: configService.get<string>('DB_PASSWORD') || '',
          database:
            configService.get<string>('DB_DATABASE') || 'db_blogpessoal',
          autoLoadEntities: true,
          synchronize: true,
          ssl:
            configService.get<string>('DB_SSL') === 'true'
              ? { rejectUnauthorized: false }
              : false,
        };
      },
    }),

    UsuarioModule,
    PostagemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
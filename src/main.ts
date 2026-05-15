import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  const config = new DocumentBuilder()
    .setTitle('Blog Pessoal')
    .setDescription('API do projeto Blog Pessoal')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer('https://web-jsts-atividade-crud-blog-pessoal.onrender.com')
    .addServer('http://localhost:3000')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);

  const port = process.env.PORT || 3000;

  await app.listen(port);

  console.log(`Aplicação rodando na porta ${port}`);
  console.log(`Swagger disponível em: /swagger`);
}

bootstrap();
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
const request = require('supertest');
import { UsuarioModule } from '../src/usuario/usuario.module';
import { Usuario } from '../src/usuario/entities/usuario.entity';

describe('Usuário (e2e)', () => {
  let app: INestApplication;

  const usuarioBase = {
    nome: 'Maria da Silva',
    usuario: 'maria@email.com',
    senha: '123456',
    foto: 'https://i.imgur.com/foto.png',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          entities: [Usuario],
          synchronize: true,
        }),
        UsuarioModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Deve Cadastrar Usuário', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send(usuarioBase)
      .expect(201);

    expect(resposta.body.nome).toEqual(usuarioBase.nome);
    expect(resposta.body.usuario).toEqual(usuarioBase.usuario);
    expect(resposta.body.senha).toBeUndefined();
  });

  it('Deve Autenticar Usuário', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/logar')
      .send({
        usuario: usuarioBase.usuario,
        senha: usuarioBase.senha,
      })
      .expect(201);

    expect(resposta.body.usuario).toEqual(usuarioBase.usuario);
    expect(resposta.body.token).toBeDefined();
  });

  it('Não Deve Cadastrar Usuário Duplicado', async () => {
    await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send(usuarioBase)
      .expect(400);
  });

  it('Deve Listar todos os Usuários', async () => {
    const resposta = await request(app.getHttpServer())
      .get('/usuarios/all')
      .expect(200);

    expect(Array.isArray(resposta.body)).toBe(true);
    expect(resposta.body.length).toBeGreaterThan(0);
  });

  it('Deve Atualizar os dados de um Usuário', async () => {
    const lista = await request(app.getHttpServer())
      .get('/usuarios/all')
      .expect(200);

    const usuarioSalvo = lista.body[0];

    const resposta = await request(app.getHttpServer())
      .put('/usuarios/atualizar')
      .send({
        id: usuarioSalvo.id,
        nome: 'Maria Atualizada',
        usuario: 'maria.atualizada@email.com',
        senha: '654321',
        foto: 'https://i.imgur.com/foto-nova.png',
      })
      .expect(200);

    expect(resposta.body.nome).toEqual('Maria Atualizada');
    expect(resposta.body.usuario).toEqual('maria.atualizada@email.com');
    expect(resposta.body.senha).toBeUndefined();
  });
});

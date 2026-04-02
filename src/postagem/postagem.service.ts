import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostagemDto } from './dto/create-postagem.dto';
import { UpdatePostagemDto } from './dto/update-postagem.dto';
import { Postagem } from './entities.postagem';

@Injectable()
export class PostagemService {
  private sequenciaId = 3;

  private postagens: Postagem[] = [
    new Postagem({
      id: 1,
      titulo: 'Primeira postagem',
      texto: 'Este é um exemplo inicial de postagem no Blog Pessoal usando NestJS.',
      autor: 'Victor Ferreira Silva',
      tema: 'Tecnologia',
      publicada: true,
      data: new Date('2026-04-02T10:00:00'),
    }),
    new Postagem({
      id: 2,
      titulo: 'CRUD com TypeScript',
      texto: 'Nesta API é possível cadastrar, listar, editar e excluir postagens.',
      autor: 'Victor Ferreira Silva',
      tema: 'Desenvolvimento',
      publicada: true,
      data: new Date('2026-04-02T11:00:00'),
    }),
  ];

  findAll(): Postagem[] {
    return this.postagens.sort((a, b) => b.id - a.id);
  }

  findOne(id: number): Postagem {
    const postagem = this.postagens.find((item) => item.id === id);

    if (!postagem) {
      throw new NotFoundException(`Postagem com id ${id} não encontrada.`);
    }

    return postagem;
  }

  create(createPostagemDto: CreatePostagemDto): Postagem {
    const novaPostagem = new Postagem({
      id: this.sequenciaId++,
      ...createPostagemDto,
      data: new Date(),
    });

    this.postagens.push(novaPostagem);
    return novaPostagem;
  }

  update(id: number, updatePostagemDto: UpdatePostagemDto): Postagem {
    const postagem = this.findOne(id);

    Object.assign(postagem, updatePostagemDto);
    return postagem;
  }

  remove(id: number): { message: string } {
    const indice = this.postagens.findIndex((item) => item.id === id);

    if (indice === -1) {
      throw new NotFoundException(`Postagem com id ${id} não encontrada.`);
    }

    this.postagens.splice(indice, 1);

    return {
      message: `Postagem com id ${id} removida com sucesso.`,
    };
  }
}

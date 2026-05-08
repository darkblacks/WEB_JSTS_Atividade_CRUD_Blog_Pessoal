import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { Postagem } from './entities/postagem.entity';
import { Tema } from '../tema/entities/tema.entity';
import { CreatePostagemDto } from './dto/create-postagem.dto';
import { UpdatePostagemDto } from './dto/update-postagem.dto';

@Injectable()
export class PostagemService {
  constructor(
    @InjectRepository(Postagem)
    private readonly postagemRepository: Repository<Postagem>,

    @InjectRepository(Tema)
    private readonly temaRepository: Repository<Tema>,
  ) {}

  async listarTodos() {
    return await this.postagemRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  async buscarPorId(id: number) {
    const postagem = await this.postagemRepository.findOne({
      where: { id },
    });

    if (!postagem) {
      throw new NotFoundException('Postagem não encontrada.');
    }

    return postagem;
  }

  async buscarPorTitulo(titulo: string) {
    return await this.postagemRepository.find({
      where: {
        titulo: ILike(`%${titulo}%`),
      },
      order: {
        id: 'DESC',
      },
    });
  }

  async cadastrar(dados: CreatePostagemDto) {
    const tema = await this.temaRepository.findOne({
      where: {
        id: dados.temaId,
      },
    });

    if (!tema) {
      throw new NotFoundException('Tema não encontrado.');
    }

    const novaPostagem = this.postagemRepository.create({
      titulo: dados.titulo,
      texto: dados.texto,
      autor: dados.autor,
      tema,
    });

    return await this.postagemRepository.save(novaPostagem);
  }

  async atualizar(dados: UpdatePostagemDto) {
    const postagem = await this.postagemRepository.findOne({
      where: {
        id: dados.id,
      },
    });

    if (!postagem) {
      throw new NotFoundException('Postagem não encontrada.');
    }

    const tema = await this.temaRepository.findOne({
      where: {
        id: dados.temaId,
      },
    });

    if (!tema) {
      throw new NotFoundException('Tema não encontrado.');
    }

    postagem.titulo = dados.titulo;
    postagem.texto = dados.texto;
    postagem.autor = dados.autor;
    postagem.tema = tema;

    return await this.postagemRepository.save(postagem);
  }

  async deletar(id: number) {
    const postagem = await this.postagemRepository.findOne({
      where: {
        id,
      },
    });

    if (!postagem) {
      throw new NotFoundException('Postagem não encontrada.');
    }

    await this.postagemRepository.delete(id);

    return {
      mensagem: 'Postagem deletada com sucesso.',
    };
  }
}
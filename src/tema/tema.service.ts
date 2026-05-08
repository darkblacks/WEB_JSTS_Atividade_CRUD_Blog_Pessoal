import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { Tema } from './entities/tema.entity';
import { CreateTemaDto } from './dto/create-tema.dto';
import { UpdateTemaDto } from './dto/update-tema.dto';

@Injectable()
export class TemaService {
  constructor(
    @InjectRepository(Tema)
    private readonly temaRepository: Repository<Tema>,
  ) {}

  async listarTodos() {
    return await this.temaRepository.find({
      relations: {
        postagens: true,
      },
      order: {
        id: 'ASC',
      },
    });
  }

  async buscarPorId(id: number) {
    const tema = await this.temaRepository.findOne({
      where: { id },
      relations: {
        postagens: true,
      },
    });

    if (!tema) {
      throw new NotFoundException('Tema não encontrado.');
    }

    return tema;
  }

  async buscarPorDescricao(descricao: string) {
    return await this.temaRepository.find({
      where: {
        descricao: ILike(`%${descricao}%`),
      },
      relations: {
        postagens: true,
      },
    });
  }

  async cadastrar(dados: CreateTemaDto) {
    const existe = await this.temaRepository.findOne({
      where: {
        descricao: dados.descricao,
      },
    });

    if (existe) {
      throw new BadRequestException('Tema já cadastrado.');
    }

    const novoTema = this.temaRepository.create(dados);

    return await this.temaRepository.save(novoTema);
  }

  async atualizar(dados: UpdateTemaDto) {
    const temaExistente = await this.temaRepository.findOne({
      where: {
        id: dados.id,
      },
    });

    if (!temaExistente) {
      throw new NotFoundException('Tema não encontrado.');
    }

    temaExistente.descricao = dados.descricao;

    return await this.temaRepository.save(temaExistente);
  }

  async deletar(id: number) {
    const tema = await this.temaRepository.findOne({
      where: { id },
    });

    if (!tema) {
      throw new NotFoundException('Tema não encontrado.');
    }

    await this.temaRepository.delete(id);

    return {
      mensagem: 'Tema deletado com sucesso.',
    };
  }
}
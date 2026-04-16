import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Postagem } from './entities/postagem.entity';

@Injectable()
export class PostagemService {
  constructor(
    @InjectRepository(Postagem)
    private readonly postagemRepository: Repository<Postagem>,
  ) {}

  async findAll(): Promise<Postagem[]> {
    return await this.postagemRepository.find();
  }

  async findById(id: number): Promise<Postagem> {
    const postagem = await this.postagemRepository.findOne({
      where: { id },
    });

    if (!postagem) {
      throw new NotFoundException('Postagem não encontrada');
    }

    return postagem;
  }

  async create(postagem: Postagem): Promise<Postagem> {
    postagem.curtidas = postagem.curtidas ?? 0;
    const novaPostagem = this.postagemRepository.create(postagem);
    return await this.postagemRepository.save(novaPostagem);
  }

  async update(id: number, postagem: Postagem): Promise<Postagem> {
    await this.findById(id);

    postagem.id = id;
    return await this.postagemRepository.save(postagem);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.postagemRepository.delete(id);
  }

  async curtir(id: number): Promise<Postagem> {
    const postagem = await this.findById(id);
    postagem.curtidas += 1;
    return await this.postagemRepository.save(postagem);
  }

  async findByHumor(humor: string): Promise<Postagem[]> {
    return await this.postagemRepository.find({
      where: { humor },
    });
  }
}
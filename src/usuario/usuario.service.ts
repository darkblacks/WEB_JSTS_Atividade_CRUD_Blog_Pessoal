import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }

  async findById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return usuario;
  }

  async create(usuario: Usuario): Promise<Usuario> {
    const novoUsuario = this.usuarioRepository.create(usuario);
    return await this.usuarioRepository.save(novoUsuario);
  }

  async update(id: number, usuario: Usuario): Promise<Usuario> {
    await this.findById(id);

    usuario.id = id;
    await this.usuarioRepository.save(usuario);

    return await this.findById(id);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.usuarioRepository.delete(id);
  }
}
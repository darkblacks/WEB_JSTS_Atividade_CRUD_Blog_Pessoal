import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createHash } from 'crypto';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  private criptografarSenha(senha: string): string {
    return createHash('sha256').update(senha).digest('hex');
  }

  private semSenha(usuario: Usuario) {
    const { senha, ...resto } = usuario;
    return resto;
  }

  async cadastrar(dados: CreateUsuarioDto) {
    const existe = await this.usuarioRepository.findOne({ where: { usuario: dados.usuario } });

    if (existe) {
      throw new BadRequestException('O usuário já está cadastrado.');
    }

    const novoUsuario = this.usuarioRepository.create({
      ...dados,
      senha: this.criptografarSenha(dados.senha),
    });

    const salvo = await this.usuarioRepository.save(novoUsuario);
    return this.semSenha(salvo as Usuario);
  }

  async autenticar(dados: LoginDto) {
    const usuario = await this.usuarioRepository.findOne({ where: { usuario: dados.usuario } });

    if (!usuario || usuario.senha !== this.criptografarSenha(dados.senha)) {
      throw new UnauthorizedException('Usuário ou senha inválidos.');
    }

    return {
      id: usuario.id,
      nome: usuario.nome,
      usuario: usuario.usuario,
      foto: usuario.foto,
      token: Buffer.from(`${usuario.usuario}:${Date.now()}`).toString('base64'),
    };
  }

  async listarTodos() {
    const usuarios = await this.usuarioRepository.find({ order: { id: 'ASC' } });
    return usuarios.map((usuario) => this.semSenha(usuario));
  }

  async atualizar(dados: UpdateUsuarioDto) {
    const usuarioExistente = await this.usuarioRepository.findOne({ where: { id: dados.id } });

    if (!usuarioExistente) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const usuarioComMesmoEmail = await this.usuarioRepository.findOne({ where: { usuario: dados.usuario } });

    if (usuarioComMesmoEmail && usuarioComMesmoEmail.id !== dados.id) {
      throw new BadRequestException('O usuário já está cadastrado.');
    }

    usuarioExistente.nome = dados.nome;
    usuarioExistente.usuario = dados.usuario;
    usuarioExistente.senha = this.criptografarSenha(dados.senha);
    usuarioExistente.foto = dados.foto;

    const atualizado = await this.usuarioRepository.save(usuarioExistente);
    return this.semSenha(atualizado);
  }
}

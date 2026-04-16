import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Usuario } from './entities/usuario.entity';
import { UsuarioService } from './usuario.service';

@ApiTags('Usuários')
@Controller('/usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários', type: [Usuario] })
  findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Buscar usuário por ID' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado', type: Usuario })
  findById(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this.usuarioService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cadastrar usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso', type: Usuario })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.create(usuario);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Atualizar usuário' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso', type: Usuario })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() usuario: Usuario,
  ): Promise<Usuario> {
    return this.usuarioService.update(id, usuario);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Deletar usuário' })
  @ApiResponse({ status: 204, description: 'Usuário deletado com sucesso' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.usuarioService.delete(id);
  }
}
import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('/cadastrar')
  cadastrar(@Body() dados: CreateUsuarioDto) {
    return this.usuarioService.cadastrar(dados);
  }

  @Post('/logar')
  logar(@Body() dados: LoginDto) {
    return this.usuarioService.autenticar(dados);
  }

  @Get('/all')
  listarTodos() {
    return this.usuarioService.listarTodos();
  }

  @Put('/atualizar')
  atualizar(@Body() dados: UpdateUsuarioDto) {
    return this.usuarioService.atualizar(dados);
  }
}

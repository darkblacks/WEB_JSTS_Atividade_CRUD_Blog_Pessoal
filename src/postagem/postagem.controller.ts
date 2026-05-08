import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { PostagemService } from './postagem.service';
import { CreatePostagemDto } from './dto/create-postagem.dto';
import { UpdatePostagemDto } from './dto/update-postagem.dto';

@Controller('/postagens')
export class PostagemController {
  constructor(private readonly postagemService: PostagemService) {}

  @Get()
  listarTodos() {
    return this.postagemService.listarTodos();
  }

  @Get('/titulo/:titulo')
  buscarPorTitulo(@Param('titulo') titulo: string) {
    return this.postagemService.buscarPorTitulo(titulo);
  }

  @Get('/:id')
  buscarPorId(@Param('id') id: string) {
    return this.postagemService.buscarPorId(Number(id));
  }

  @Post()
  cadastrar(@Body() dados: CreatePostagemDto) {
    return this.postagemService.cadastrar(dados);
  }

  @Put()
  atualizar(@Body() dados: UpdatePostagemDto) {
    return this.postagemService.atualizar(dados);
  }

  @Delete('/:id')
  deletar(@Param('id') id: string) {
    return this.postagemService.deletar(Number(id));
  }
}
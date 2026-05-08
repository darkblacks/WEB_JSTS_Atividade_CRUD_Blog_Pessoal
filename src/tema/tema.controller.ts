import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { TemaService } from './tema.service';
import { CreateTemaDto } from './dto/create-tema.dto';
import { UpdateTemaDto } from './dto/update-tema.dto';

@Controller('/temas')
export class TemaController {
  constructor(private readonly temaService: TemaService) {}

  @Get()
  listarTodos() {
    return this.temaService.listarTodos();
  }

  @Get('/descricao/:descricao')
  buscarPorDescricao(@Param('descricao') descricao: string) {
    return this.temaService.buscarPorDescricao(descricao);
  }

  @Get('/:id')
  buscarPorId(@Param('id') id: string) {
    return this.temaService.buscarPorId(Number(id));
  }

  @Post()
  cadastrar(@Body() dados: CreateTemaDto) {
    return this.temaService.cadastrar(dados);
  }

  @Put()
  atualizar(@Body() dados: UpdateTemaDto) {
    return this.temaService.atualizar(dados);
  }

  @Delete('/:id')
  deletar(@Param('id') id: string) {
    return this.temaService.deletar(Number(id));
  }
}
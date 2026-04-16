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
import { Postagem } from './entities/postagem.entity';
import { PostagemService } from './postagem.service';

@ApiTags('Postagens')
@Controller('/postagens')
export class PostagemController {
  constructor(private readonly postagemService: PostagemService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as postagens' })
  @ApiResponse({ status: 200, description: 'Lista de postagens', type: [Postagem] })
  findAll(): Promise<Postagem[]> {
    return this.postagemService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Buscar postagem por ID' })
  @ApiResponse({ status: 200, description: 'Postagem encontrada', type: Postagem })
  findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem> {
    return this.postagemService.findById(id);
  }

  @Get('/humor/:humor')
  @ApiOperation({ summary: 'Buscar postagens por humor' })
  @ApiResponse({ status: 200, description: 'Lista de postagens por humor', type: [Postagem] })
  findByHumor(@Param('humor') humor: string): Promise<Postagem[]> {
    return this.postagemService.findByHumor(humor);
  }

  @Post()
  @ApiOperation({ summary: 'Cadastrar postagem' })
  @ApiResponse({ status: 201, description: 'Postagem criada com sucesso', type: Postagem })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() postagem: Postagem): Promise<Postagem> {
    return this.postagemService.create(postagem);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Atualizar postagem' })
  @ApiResponse({ status: 200, description: 'Postagem atualizada com sucesso', type: Postagem })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() postagem: Postagem,
  ): Promise<Postagem> {
    return this.postagemService.update(id, postagem);
  }

  @Put('/:id/curtir')
  @ApiOperation({ summary: 'Curtir uma postagem' })
  @ApiResponse({ status: 200, description: 'Curtida registrada com sucesso', type: Postagem })
  curtir(@Param('id', ParseIntPipe) id: number): Promise<Postagem> {
    return this.postagemService.curtir(id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Deletar postagem' })
  @ApiResponse({ status: 204, description: 'Postagem deletada com sucesso' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.postagemService.delete(id);
  }
}
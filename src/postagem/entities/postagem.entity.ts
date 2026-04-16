import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_postagens' })
export class Postagem {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @Column({ length: 150 })
  @ApiProperty({
    example: 'Meu dia estudando NestJS',
    description: 'Título da postagem',
  })
  titulo: string;

  @Column({ type: 'text' })
  @ApiProperty({
    example: 'Hoje consegui subir minha API no Render.',
    description: 'Conteúdo da postagem',
  })
  texto: string;

  @Column({ length: 50 })
  @ApiProperty({
    example: 'Motivado',
    description: 'Humor do autor no momento da postagem',
  })
  humor: string;

  @Column({ default: 0 })
  @ApiProperty({
    example: 0,
    description: 'Quantidade de curtidas da postagem',
  })
  curtidas: number;
}
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @Column({ length: 100, unique: true })
  @ApiProperty({
    example: 'drielly123',
    description: 'Nome de usuário para login',
  })
  usuario: string;

  @Column({ length: 150 })
  @ApiProperty({
    example: 'Drielly Figueredo',
    description: 'Nome completo do usuário',
  })
  nome: string;

  @Column({ length: 150, unique: true })
  @ApiProperty({
    example: 'drielly@email.com',
    description: 'E-mail do usuário',
  })
  email: string;

  @Column({ length: 255 })
  @ApiProperty({
    example: '123456',
    description: 'Senha do usuário',
  })
  senha: string;
}
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Postagem } from '../../postagem/entities/postagem.entity';

@Entity({ name: 'tb_temas' })
export class Tema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 100 })
  descricao: string;

  @OneToMany(() => Postagem, (postagem) => postagem.tema)
  postagens: Postagem[];
}
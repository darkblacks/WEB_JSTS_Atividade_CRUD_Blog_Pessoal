import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ unique: true, length: 100 })
  usuario: string;

  @Column({ length: 255 })
  senha: string;

  @Column({ length: 500, nullable: true })
  foto?: string;
}

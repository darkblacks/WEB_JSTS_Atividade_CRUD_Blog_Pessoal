export class Postagem {
  id!: number;
  titulo!: string;
  texto!: string;
  autor!: string;
  tema!: string;
  data!: Date;
  publicada!: boolean;

  constructor(init?: Partial<Postagem>) {
    Object.assign(this, init);
  }
}
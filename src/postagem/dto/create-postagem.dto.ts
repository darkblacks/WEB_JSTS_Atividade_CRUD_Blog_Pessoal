import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePostagemDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  titulo!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  texto!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  autor!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  tema!: string;
}
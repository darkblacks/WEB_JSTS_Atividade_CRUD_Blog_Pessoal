import { PartialType } from '@nestjs/mapped-types';
import { CreatePostagemDto } from './create-postagem.dto';

export class UpdatePostagemDto extends PartialType(CreatePostagemDto) {}

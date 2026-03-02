import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateCursoDto } from './create-curso.dto';

// no permitimos cambiar el docenteCedula a través de esta ruta
export class UpdateCursoDto extends PartialType(
  OmitType(CreateCursoDto, ['docenteCedula'] as const),
) {}

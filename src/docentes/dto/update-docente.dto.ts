import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateDocenteDto } from './create-docente.dto';

// no se puede cambiar la cédula
export class UpdateDocenteDto extends PartialType(
  OmitType(CreateDocenteDto, ['cedula'] as const),
) {}

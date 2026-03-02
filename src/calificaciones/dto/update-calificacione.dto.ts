import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateCalificacioneDto } from './create-calificacione.dto';

// No permitimos cambiar la matrícula a través del PATCH ni enviar nota_final
export class UpdateCalificacioneDto extends PartialType(
  OmitType(CreateCalificacioneDto, ['matriculaId'] as const),
) {}

import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateMatriculaDto } from './create-matricula.dto';

// No permitimos cambiar estudiante ni curso a través del PATCH
export class UpdateMatriculaDto extends PartialType(
	OmitType(CreateMatriculaDto, ['estudianteCedula', 'cursoId'] as const),
) {}

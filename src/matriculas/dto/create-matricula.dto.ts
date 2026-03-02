import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateMatriculaDto {
	@IsNotEmpty()
	@IsString()
	estudianteCedula: string;

	@IsNotEmpty()
	@IsNumber()
	cursoId: number;

	@IsNotEmpty()
	@IsString()
	periodo_lectivo: string;

	@IsNotEmpty()
	@IsNumber()
	costo_matricula: number;
}

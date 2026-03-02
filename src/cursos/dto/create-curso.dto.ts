import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCursoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  // aquí va la cédula del docente que imparte el curso
  @IsNotEmpty()
  @IsString()
  docenteCedula: string;
}

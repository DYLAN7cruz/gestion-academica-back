import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateDocenteDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  cedula: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  nombres: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  apellidos: string;

  @IsNotEmpty()
  fecha_nacimiento: Date;

  @IsNotEmpty()
  @IsString()
  correo_electronico: string;

  @IsNotEmpty()
  genero: string;
}

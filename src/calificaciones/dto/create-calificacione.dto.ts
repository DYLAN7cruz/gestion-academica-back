import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCalificacioneDto {
  @IsNotEmpty()
  @IsNumber()
  matriculaId: number;

  @IsOptional()
  @IsNumber()
  nota_parcial_1?: number;

  @IsOptional()
  @IsNumber()
  nota_parcial_2?: number;

  // nota_final no se envía en el payload; se calcula internamente

  @IsOptional()
  @IsString()
  observaciones?: string;

  @IsNotEmpty()
  @IsString()
  estado_aprobacion: string;
}

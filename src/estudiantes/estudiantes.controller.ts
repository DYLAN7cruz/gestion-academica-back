import { Controller, Post, Body, Get, UseGuards, Param, Patch, Delete, HttpCode } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';

@Controller('estudiantes')
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createEstudianteDto: CreateEstudianteDto) {
    const createdEstudiante = await this.estudiantesService.create(createEstudianteDto);
    return {
      message: 'Estudiante creado exitosamente',
      estudiante: createdEstudiante,
    };
  }

  @Get()
  findAll() {
    return this.estudiantesService.findAll();
  }

  @Get(':cedula')
  findOne(@Param('cedula') cedula: string) {
    return this.estudiantesService.findOne(cedula);
  }

  @Patch(':cedula')
  update(
    @Param('cedula') cedula: string,
    @Body() updateEstudianteDto: UpdateEstudianteDto,
  ) {
    return this.estudiantesService.update(cedula, updateEstudianteDto);
  }

  @Delete(':cedula')
  remove(@Param('cedula') cedula: string) {
    return this.estudiantesService.remove(cedula);
  }
}

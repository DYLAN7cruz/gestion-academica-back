import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DocentesService } from './docentes.service';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';

@Controller('docentes')
export class DocentesController {
  constructor(private readonly docentesService: DocentesService) {}

  @Post()
  create(@Body() createDocenteDto: CreateDocenteDto) {
    return this.docentesService.create(createDocenteDto);
  }

  @Get()
  findAll() {
    return this.docentesService.findAll();
  }

  @Get(':cedula')
  findOne(@Param('cedula') cedula: string) {
    return this.docentesService.findOne(cedula);
  }

  @Patch(':cedula')
  update(
    @Param('cedula') cedula: string,
    @Body() updateDocenteDto: UpdateDocenteDto,
  ) {
    return this.docentesService.update(cedula, updateDocenteDto);
  }

  @Delete(':cedula')
  remove(@Param('cedula') cedula: string) {
    return this.docentesService.remove(cedula);
  }
}

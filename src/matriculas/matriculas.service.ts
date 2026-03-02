import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Matricula } from './entities/matricula.entity';
import { Repository } from 'typeorm';
import { Estudiante } from '../estudiantes/entities/estudiante.entity';
import { Curso } from '../cursos/entities/curso.entity';

@Injectable()
export class MatriculasService {
  constructor(
    @InjectRepository(Matricula)
    private matriculaRepository: Repository<Matricula>,

    @InjectRepository(Estudiante)
    private estudianteRepository: Repository<Estudiante>,

    @InjectRepository(Curso)
    private cursoRepository: Repository<Curso>,
  ) {}

  async create(createMatriculaDto: CreateMatriculaDto) {
    const estudiante = await this.estudianteRepository.findOne({ where: { cedula: createMatriculaDto.estudianteCedula } });
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con cédula ${createMatriculaDto.estudianteCedula} no existe`);
    }

    const curso = await this.cursoRepository.findOne({ where: { id: createMatriculaDto.cursoId } });
    if (!curso) {
      throw new NotFoundException(`Curso con id ${createMatriculaDto.cursoId} no existe`);
    }

    const matricula = this.matriculaRepository.create({
      estudiante,
      curso,
      periodo_lectivo: createMatriculaDto.periodo_lectivo,
      costo_matricula: createMatriculaDto.costo_matricula,
    });

    return this.matriculaRepository.save(matricula);
  }

  async findAll() {
    return await this.matriculaRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const matricula = await this.matriculaRepository.findOne({ where: { id } });
    if (!matricula) {
      throw new NotFoundException(`Matrícula con id ${id} no encontrada`);
    }
    return matricula;
  }

  async update(id: number, updateMatriculaDto: UpdateMatriculaDto) {
    const matricula = await this.findOne(id);
    Object.assign(matricula, updateMatriculaDto);
    return this.matriculaRepository.save(matricula);
  }

  async remove(id: number) {
    const matricula = await this.findOne(id);
    await this.matriculaRepository.remove(matricula);
    return { message: `Matrícula ${id} eliminada` };
  }
}

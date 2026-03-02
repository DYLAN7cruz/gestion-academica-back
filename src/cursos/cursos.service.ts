import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Curso } from './entities/curso.entity';
import { Repository } from 'typeorm';
import { Docente } from '../docentes/entities/docente.entity';

@Injectable()
export class CursosService {
  constructor(
    @InjectRepository(Curso)
    private cursoRepository: Repository<Curso>,

    @InjectRepository(Docente)
    private docenteRepository: Repository<Docente>,
  ) {}

  async create(createCursoDto: CreateCursoDto) {
    const docente = await this.docenteRepository.findOne({ where: { cedula: createCursoDto.docenteCedula } });
    if (!docente) {
      throw new NotFoundException(`Docente con cédula ${createCursoDto.docenteCedula} no existe`);
    }
    const curso = this.cursoRepository.create({
      nombre: createCursoDto.nombre,
      docente,
    });
    return this.cursoRepository.save(curso);
  }

  async findAll() {
    return await this.cursoRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const curso = await this.cursoRepository.findOne({ where: { id } });
    if (!curso) {
      throw new NotFoundException(`Curso con id ${id} no encontrado`);
    }
    return curso;
  }

  async update(id: number, updateCursoDto: UpdateCursoDto) {
    const curso = await this.findOne(id);
    Object.assign(curso, updateCursoDto);
    return this.cursoRepository.save(curso);
  }

  async remove(id: number) {
    const curso = await this.findOne(id);
    await this.cursoRepository.remove(curso);
    return { message: `Curso ${id} eliminado` };
  }
}

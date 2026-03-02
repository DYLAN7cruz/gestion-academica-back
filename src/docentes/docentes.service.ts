import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Docente } from './entities/docente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DocentesService {
  constructor(
    @InjectRepository(Docente)
    private docenteRepository: Repository<Docente>,
  ) {}

  async create(createDocenteDto: CreateDocenteDto) {
    const exists = await this.docenteRepository.findOne({ where: { cedula: createDocenteDto.cedula } });
    if (exists) {
      throw new NotFoundException(`La cédula ${createDocenteDto.cedula} ya está registrada`);
    }
    const docente = this.docenteRepository.create(createDocenteDto);
    return this.docenteRepository.save(docente);
  }

  async findAll() {
    return await this.docenteRepository.find({
      order: { fecha_creacion: 'DESC' },
    });
  }

  async findOne(cedula: string) {
    const docente = await this.docenteRepository.findOne({ where: { cedula } });
    if (!docente) {
      throw new NotFoundException(`Docente con cédula ${cedula} no encontrado`);
    }
    return docente;
  }

  async update(cedula: string, updateDocenteDto: UpdateDocenteDto) {
    const docente = await this.findOne(cedula);
    Object.assign(docente, updateDocenteDto);
    return this.docenteRepository.save(docente);
  }

  async remove(cedula: string) {
    const docente = await this.findOne(cedula);
    await this.docenteRepository.remove(docente);
    return { message: `Docente con cédula ${cedula} eliminado` };
  }
}

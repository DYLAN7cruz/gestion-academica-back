import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstudiantesService {
  constructor(
    @InjectRepository(Estudiante)
    private estudianteRepository: Repository<Estudiante>,
  ) {}


  async create(createEstudianteDto: CreateEstudianteDto) {
    // verificar que no exista otra cédula igual
    const exists = await this.estudianteRepository.findOne({ where: { cedula: createEstudianteDto.cedula } });
    if (exists) {
      throw new NotFoundException(`La cédula ${createEstudianteDto.cedula} ya está registrada`);
    }

    const estudiante = this.estudianteRepository.create(createEstudianteDto);
    return await this.estudianteRepository.save(estudiante);
  }

  async findAll() {
    return await this.estudianteRepository.find({
      order: { fecha_creacion: 'DESC' },
    });
  }

  async findOne(cedula: string) {
    const estudiante = await this.estudianteRepository.findOne({ where: { cedula } });
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con cédula ${cedula} no encontrado`);
    }
    return estudiante;
  }

  async update(
    cedula: string,
    updateEstudianteDto: UpdateEstudianteDto,
  ) {
    const estudiante = await this.findOne(cedula);
    Object.assign(estudiante, updateEstudianteDto);
    return this.estudianteRepository.save(estudiante);
  }

  async remove(cedula: string) {
    const estudiante = await this.findOne(cedula);
    await this.estudianteRepository.remove(estudiante);
    return { message: `Estudiante con cédula ${cedula} eliminado` };
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCalificacioneDto } from './dto/create-calificacione.dto';
import { UpdateCalificacioneDto } from './dto/update-calificacione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Calificacione } from './entities/calificacione.entity';
import { Repository } from 'typeorm';
import { Matricula } from '../matriculas/entities/matricula.entity';

@Injectable()
export class CalificacionesService {
  constructor(
    @InjectRepository(Calificacione)
    private califRepository: Repository<Calificacione>,

    @InjectRepository(Matricula)
    private matriculaRepository: Repository<Matricula>,
  ) {}

  private computeNotaFinal(values: (number | undefined)[]) {
    const notas = values.filter((v) => v !== undefined && v !== null) as number[];
    if (notas.length === 0) return 0;
    const sum = notas.reduce((a, b) => a + b, 0);
    return parseFloat((sum / notas.length).toFixed(2));
  }

  async create(createCalificacioneDto: CreateCalificacioneDto) {
    const matricula = await this.matriculaRepository.findOne({ where: { id: createCalificacioneDto.matriculaId } });
    if (!matricula) throw new NotFoundException(`Matrícula con id ${createCalificacioneDto.matriculaId} no encontrada`);

    const nota_final = this.computeNotaFinal([
      createCalificacioneDto.nota_parcial_1,
      createCalificacioneDto.nota_parcial_2,
    ]);

    const calif = this.califRepository.create({
      matricula,
      nota_parcial_1: createCalificacioneDto.nota_parcial_1,
      nota_parcial_2: createCalificacioneDto.nota_parcial_2,
      nota_final,
      observaciones: createCalificacioneDto.observaciones,
      estado_aprobacion: createCalificacioneDto.estado_aprobacion,
    });

    return this.califRepository.save(calif);
  }

  async findAll() {
    return await this.califRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const calif = await this.califRepository.findOne({ where: { id } });
    if (!calif) throw new NotFoundException(`Calificación con id ${id} no encontrada`);
    return calif;
  }

  async update(id: number, updateCalificacioneDto: UpdateCalificacioneDto) {
    const calif = await this.findOne(id);
    if ('nota_parcial_1' in updateCalificacioneDto || 'nota_parcial_2' in updateCalificacioneDto) {
      const nota_final = this.computeNotaFinal([
        updateCalificacioneDto.nota_parcial_1 ?? calif.nota_parcial_1,
        updateCalificacioneDto.nota_parcial_2 ?? calif.nota_parcial_2,
      ]);
      (updateCalificacioneDto as any).nota_final = nota_final;
    }
    Object.assign(calif, updateCalificacioneDto);
    return this.califRepository.save(calif);
  }

  async remove(id: number) {
    const calif = await this.findOne(id);
    await this.califRepository.remove(calif);
    return { message: `Calificación ${id} eliminada` };
  }
}

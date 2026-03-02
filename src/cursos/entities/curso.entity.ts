import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Docente } from '../../docentes/entities/docente.entity';

@Entity('cursos')
export class Curso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @ManyToOne(() => Docente, { eager: true, nullable: false })
  @JoinColumn({ name: 'docente_cedula' })
  docente: Docente; // relación al docente responsable
}

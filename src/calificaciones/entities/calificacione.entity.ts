import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Matricula } from '../../matriculas/entities/matricula.entity';

@Entity('calificaciones')
export class Calificacione {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Matricula, { eager: true, nullable: false })
  @JoinColumn({ name: 'matricula_id' })
  matricula: Matricula;

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  nota_parcial_1: number;

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  nota_parcial_2: number;

  @Column('decimal', { precision: 5, scale: 2 })
  nota_final: number;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @Column({ length: 50 })
  estado_aprobacion: string;
}

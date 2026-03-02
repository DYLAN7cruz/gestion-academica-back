import { Entity, PrimaryColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Matricula } from '../../matriculas/entities/matricula.entity';

@Entity('estudiantes')
export class Estudiante {
  // la cédula será la clave primaria del estudiante
  @PrimaryColumn({ length: 20 })
  cedula: string;

  @Column({ length: 100 })
  nombres: string;

  @Column({ length: 100 })
  apellidos: string;

  // Fecha de nacimiento almacenada como fecha, no se necesita longitud
  @Column({ type: 'date' })
  fecha_nacimiento: Date;

  @Column({ length: 100 })
  correo_electronico: string;

  @Column({ length: 100 })
  genero: string;

  @OneToMany(() => Matricula, (mat) => mat.estudiante)
  matriculas: Matricula[];

  @CreateDateColumn()
  fecha_creacion: Date;
}
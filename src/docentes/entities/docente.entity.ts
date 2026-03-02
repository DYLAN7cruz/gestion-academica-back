import { Entity, PrimaryColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Curso } from '../../cursos/entities/curso.entity';

@Entity('docentes')
export class Docente {
  // la cédula será la clave primaria del docente
  @PrimaryColumn({ length: 20 })
  cedula: string;

  @Column({ length: 100 })
  nombres: string;

  @Column({ length: 100 })
  apellidos: string;

  @Column({ type: 'date' })
  fecha_nacimiento: Date;

  @Column({ length: 100 })
  correo_electronico: string;

  @Column({ length: 100 })
  genero: string;

  @OneToMany(() => Curso, (curso) => curso.docente)
  cursos: Curso[];

  @CreateDateColumn()
  fecha_creacion: Date;
}

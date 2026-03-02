import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Estudiante } from '../../estudiantes/entities/estudiante.entity';
import { Curso } from '../../cursos/entities/curso.entity';
import { Calificacione } from '../../calificaciones/entities/calificacione.entity';

@Entity('matriculas')
export class Matricula {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Estudiante, { eager: true, nullable: false })
	@JoinColumn({ name: 'estudiante_cedula' })
	estudiante: Estudiante;

	@ManyToOne(() => Curso, { eager: true, nullable: false })
	@JoinColumn({ name: 'curso_id' })
	curso: Curso;

	@Column({ length: 100 })
	periodo_lectivo: string;

	@Column('decimal', { precision: 10, scale: 2 })
	costo_matricula: number;

	@OneToMany(() => Calificacione, (c) => c.matricula)
	calificaciones: Calificacione[];
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatriculasService } from './matriculas.service';
import { MatriculasController } from './matriculas.controller';
import { Matricula } from './entities/matricula.entity';
import { Estudiante } from '../estudiantes/entities/estudiante.entity';
import { Curso } from '../cursos/entities/curso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Matricula, Estudiante, Curso])],
  controllers: [MatriculasController],
  providers: [MatriculasService],
})
export class MatriculasModule {}

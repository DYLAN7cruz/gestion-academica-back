import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalificacionesService } from './calificaciones.service';
import { CalificacionesController } from './calificaciones.controller';
import { Calificacione } from './entities/calificacione.entity';
import { Matricula } from '../matriculas/entities/matricula.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Calificacione, Matricula])],
  controllers: [CalificacionesController],
  providers: [CalificacionesService],
})
export class CalificacionesModule {}

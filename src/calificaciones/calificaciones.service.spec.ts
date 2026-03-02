import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CalificacionesService } from './calificaciones.service';
import { Calificacione } from './entities/calificacione.entity';
import { Repository } from 'typeorm';
import { Matricula } from '../matriculas/entities/matricula.entity';

describe('CalificacionesService', () => {
  let service: CalificacionesService;
  let calRepo: Repository<Calificacione>;
  let matRepo: Repository<Matricula>;

  const mockCal = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };
  const mockMat = { findOne: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CalificacionesService,
        { provide: getRepositoryToken(Calificacione), useValue: mockCal },
        { provide: getRepositoryToken(Matricula), useValue: mockMat },
      ],
    }).compile();

    service = module.get<CalificacionesService>(CalificacionesService);
    calRepo = module.get<Repository<Calificacione>>(getRepositoryToken(Calificacione));
    matRepo = module.get<Repository<Matricula>>(getRepositoryToken(Matricula));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(calRepo).toBeDefined();
    expect(matRepo).toBeDefined();
  });
});

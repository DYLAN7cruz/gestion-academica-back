import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MatriculasService } from './matriculas.service';
import { Matricula } from './entities/matricula.entity';
import { Repository } from 'typeorm';
import { Estudiante } from '../estudiantes/entities/estudiante.entity';
import { Curso } from '../cursos/entities/curso.entity';

describe('MatriculasService', () => {
  let service: MatriculasService;
  let matRepo: Repository<Matricula>;
  let estRepo: Repository<Estudiante>;
  let cursoRepo: Repository<Curso>;

  const mockMat = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };
  const mockEst = { findOne: jest.fn() };
  const mockCurso = { findOne: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatriculasService,
        { provide: getRepositoryToken(Matricula), useValue: mockMat },
        { provide: getRepositoryToken(Estudiante), useValue: mockEst },
        { provide: getRepositoryToken(Curso), useValue: mockCurso },
      ],
    }).compile();

    service = module.get<MatriculasService>(MatriculasService);
    matRepo = module.get<Repository<Matricula>>(getRepositoryToken(Matricula));
    estRepo = module.get<Repository<Estudiante>>(getRepositoryToken(Estudiante));
    cursoRepo = module.get<Repository<Curso>>(getRepositoryToken(Curso));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(matRepo).toBeDefined();
    expect(estRepo).toBeDefined();
    expect(cursoRepo).toBeDefined();
  });
});

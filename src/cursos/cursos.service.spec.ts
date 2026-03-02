import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CursosService } from './cursos.service';
import { Curso } from './entities/curso.entity';
import { Repository } from 'typeorm';

// We'll also provide a mock for Docente repository since service injects both
import { Docente } from '../docentes/entities/docente.entity';

describe('CursosService', () => {
  let service: CursosService;
  let cursoRepo: Repository<Curso>;
  let docenteRepo: Repository<Docente>;

  const mockCurso = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };
  const mockDoc = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CursosService,
        { provide: getRepositoryToken(Curso), useValue: mockCurso },
        { provide: getRepositoryToken(Docente), useValue: mockDoc },
      ],
    }).compile();

    service = module.get<CursosService>(CursosService);
    cursoRepo = module.get<Repository<Curso>>(getRepositoryToken(Curso));
    docenteRepo = module.get<Repository<Docente>>(getRepositoryToken(Docente));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cursoRepo).toBeDefined();
    expect(docenteRepo).toBeDefined();
  });
});

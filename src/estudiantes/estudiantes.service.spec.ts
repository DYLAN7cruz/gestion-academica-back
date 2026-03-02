import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EstudiantesService } from './estudiantes.service';
import { Estudiante } from './entities/estudiante.entity';
import { Repository } from 'typeorm';

describe('EstudiantesService', () => {
  let service: EstudiantesService;
  let repo: Repository<Estudiante>;

  const mockRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstudiantesService,
        { provide: getRepositoryToken(Estudiante), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<EstudiantesService>(EstudiantesService);
    repo = module.get<Repository<Estudiante>>(getRepositoryToken(Estudiante));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
  });
});

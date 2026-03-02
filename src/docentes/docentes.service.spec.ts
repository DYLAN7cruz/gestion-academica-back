import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DocentesService } from './docentes.service';
import { Docente } from './entities/docente.entity';
import { Repository } from 'typeorm';

describe('DocentesService', () => {
  let service: DocentesService;
  let repo: Repository<Docente>;

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
        DocentesService,
        { provide: getRepositoryToken(Docente), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<DocentesService>(DocentesService);
    repo = module.get<Repository<Docente>>(getRepositoryToken(Docente));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
  });
});

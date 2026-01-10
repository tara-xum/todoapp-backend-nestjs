import { AppService } from './app.service';
import { InMemoryTodoRepository } from './app.todo.repository';

describe('AppService', () => {
  let service: AppService;
  let repository: InMemoryTodoRepository;

  beforeEach(() => {
    repository = new InMemoryTodoRepository();
    service = new AppService(repository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});


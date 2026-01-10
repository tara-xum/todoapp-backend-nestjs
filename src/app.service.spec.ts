import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { TodoRepository } from './app.interface.repository';
import { create } from 'domain';

describe('AppService', () => {
  let service: AppService;
  let mockRepository: jest.Mocked<TodoRepository>;

  const testTodos = [
    { id: 1, title: 'Test', description: 'test', completed: false },
    { id: 2, title: 'Test2', description: 'test2', completed: false },
  ];

  beforeEach(async () => {
    const mockTodoRepository = {
      findAll: jest.fn().mockReturnValue(testTodos),
      findOne: jest.fn(),
      create: jest.fn(),
      deleteOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: 'InMemoryTodoRepository',
          useValue: mockTodoRepository,
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
    mockRepository = module.get('InMemoryTodoRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all todos from repository', () => {
      mockRepository.findAll.mockReturnValue(testTodos);
      
      const todos = service.findAll();
      
      expect(todos).toEqual(testTodos);
      expect(mockRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a todo by id', () => {
      const testTodo = testTodos[0];
      mockRepository.findOne.mockReturnValue(testTodo);
      
      const todo = service.findOne(1);
      
      expect(todo).toEqual(testTodo);
      expect(mockRepository.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when todo with given id is not found', () => {
      mockRepository.findOne.mockReturnValue(undefined);
      
      expect(() => service.findOne(1000)).toThrow();
      expect(mockRepository.findOne).toHaveBeenCalledWith(1000);
    });
  });

  describe('createTodoItem', () => {
    it('should create a todo item given a valid body', () => {
      const testTodoItem = { title: 'Test', description: 'test' };
      const resultingTodoItem = {id: "1", title: testTodoItem.title, description: testTodoItem.description, completed: false}
 
      mockRepository.create.mockReturnValue(resultingTodoItem);
      
      const todo = service.create(testTodoItem);

      expect(todo).toEqual(resultingTodoItem);
      expect(mockRepository.create).toHaveBeenCalledWith(testTodoItem);
    })
  });

  describe('deleteOne', () => {
    it('should delete a todo by id', () => {
      const testTodo = testTodos[0];
      mockRepository.findOne.mockReturnValue(testTodo);
      
      service.deleteOne(1);
      
      expect(mockRepository.findOne).toHaveBeenCalledWith(1);
      expect(mockRepository.deleteOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when trying to delete a non-existing todo', () => {
      mockRepository.findOne.mockReturnValue(undefined);
      
      expect(() => service.deleteOne(1000)).toThrow();
      expect(mockRepository.findOne).toHaveBeenCalledWith(1000);
    });
  });

});
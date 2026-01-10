import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;
  let controller: AppController;
  let service: AppService;

  const testTodos = [{ id: 1, title: 'Test', description: 'test', completed: false }];


  const mockAppService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    deleteOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: mockAppService,
        },
      ],
    }).compile();
    controller = module.get<AppController>(AppController);
    service = module.get<AppService>(AppService);
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllTodoItems', () => {
    it('should return a list of todo items', () => {
      mockAppService.findAll.mockReturnValue(testTodos);

      const result = controller.getAllTodoItems();

      expect(result).toEqual(testTodos);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getOneTodoItem', () => {
    it('should return one todo item', () => {
      const requestedId = 1;
      mockAppService.findOne.mockReturnValue(testTodos.filter(todo => todo.id === requestedId)[0]);

      const result = controller.getOneTodoItem('1');

      expect(result).toEqual({ id: 1, title: 'Test', description: 'test', completed: false });
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteOneTodoItem', () => {
    it('should delete the todo item with given id', () => {
      const requestedId = 1;

      const result = controller.deleteTodoItem('1');

      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(service.deleteOne).toHaveBeenCalledTimes(1);
    });
  });

});

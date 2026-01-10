import { Todo } from './interfaces';
import { TodoRepository } from './app.interface.repository';

export class InMemoryTodoRepository implements TodoRepository {
  private idCounter = 1;
  private todos: Todo[] = [
    {
      id: 1,
      title: 'Buy groceries',
      description: 'buy tomatoes, lettuce, bread, eggs',
      completed: false
    },
    {
      id: 2,
      title: 'Yearly Medical Check-up',
      description: 'Bring results from last year',
      completed: false
    },
  ];

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo | undefined {
    return this.todos.find(t => t.id === id);
  }

}
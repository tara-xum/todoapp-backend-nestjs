import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Todo } from './interfaces';
import { TodoRepository } from './app.interface.repository';
import { InMemoryTodoRepository } from './app.todo.repository';

@Injectable()
export class AppService {

  constructor(
    @Inject('InMemoryTodoRepository')
    private readonly repository: TodoRepository,
  ) {}

  findAll(): Todo[] {
    return this.repository.findAll();
  }

  findOne(id: number): Todo {
    const todo = this.repository.findOne(id);
    if (!todo) throw new NotFoundException();
    return todo;
  }

  deleteOne(id: number): void {
    const existingTodo = this.repository.findOne(id);
    if(!existingTodo) throw new NotFoundException();
    this.repository.deleteOne(existingTodo.id);
  }

}

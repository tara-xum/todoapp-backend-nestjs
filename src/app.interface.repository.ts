import { Todo, CreateToDoItem } from './interfaces';

export interface TodoRepository {
  findAll(): Todo[];
  findOne(id: number): Todo | undefined;
  create(toDoItem: CreateToDoItem): Todo;
  update(id: number): Todo;
  deleteOne(id: number): void;
}
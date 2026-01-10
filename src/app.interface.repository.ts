import { Todo } from './interfaces';

export interface TodoRepository {
  findAll(): Todo[];
  findOne(id: number): Todo | undefined;
  
}
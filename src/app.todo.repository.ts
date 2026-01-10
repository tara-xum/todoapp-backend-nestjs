import { Todo } from './interfaces';
import { TodoRepository } from './app.interface.repository';
import { InMemoryTodos } from './data/in-memory-todos';

export class InMemoryTodoRepository implements TodoRepository {
  private idCounter = 3;

  findAll(): Todo[] {
    return InMemoryTodos.data;
  }

  findOne(id: number): Todo | undefined {
    return InMemoryTodos.data.find(t => t.id === id);
  }

  create(toDoItem): Todo {
    this.createId();
    InMemoryTodos.data.push({
      id: this.idCounter,
      ...toDoItem,
      completed: false
    })
    return InMemoryTodos.data[InMemoryTodos.data.length - 1];
  }

  update(id: number): Todo {
    const todoIndex = InMemoryTodos.data.findIndex(t => t.id === id);
    if (todoIndex === -1) {
      return null;
    }
    InMemoryTodos.data[todoIndex].completed ? InMemoryTodos.data[todoIndex].completed = false : InMemoryTodos.data[todoIndex].completed = true;
    return InMemoryTodos.data[todoIndex];
  }

  deleteOne(id: number): void {
    InMemoryTodos.data = InMemoryTodos.data.filter(t => t.id !== id);
  }

  private createId() {
    this.idCounter++;
  }

}
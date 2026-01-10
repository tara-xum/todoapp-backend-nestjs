export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface InMemoryTodos {
  data: Todo[];
}

export interface CreateToDoItem {
  title: string;
  description: string;
}
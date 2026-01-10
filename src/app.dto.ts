export class CreateTodoItemDto {
    title: string;
    description: string;
}

export class UpdatedTodoItemDto {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}
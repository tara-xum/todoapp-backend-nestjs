import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateToDoItem, Todo } from './interfaces';
import { CreateTodoItemDto } from './app.dto'

@Controller('todos')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllTodoItems(): Todo[] {
    return this.appService.findAll();
  }

  @Get(':id')
  getOneTodoItem(@Param('id') id: string): Todo {
    return this.appService.findOne(parseInt(id));
  }

  @Post()
  createOneToDoItem(@Body() toDoItem: CreateTodoItemDto) {
    const createdToDoItem = this.appService.create(toDoItem);
    return createdToDoItem;
  }

  @Delete(':id')
  deleteTodoItem(@Param('id') id: string): string {
    this.appService.deleteOne(parseInt(id));
    return "Successfully deleted item";
  }

}

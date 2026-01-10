import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateToDoItem, Todo } from './interfaces';
import { CreateTodoItemDto, UpdatedTodoItemDto } from './app.dto'

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
  createOneToDoItem(@Body() toDoItem: CreateTodoItemDto): Todo {
    return this.appService.create(toDoItem);
  }

  @Put(':id')
  updateTodoItem(@Param('id') id: string): UpdatedTodoItemDto {
    const updatedTodoItem = this.appService.update(parseInt(id));
    return updatedTodoItem;
  }

  @Delete(':id')
  deleteTodoItem(@Param('id') id: string): string {
    this.appService.deleteOne(parseInt(id));
    return "Successfully deleted item";
  }

}

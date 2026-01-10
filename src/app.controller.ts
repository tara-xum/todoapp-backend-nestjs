import {
  Controller,
  Get,
  Param
} from '@nestjs/common';
import { AppService } from './app.service';
import { Todo } from './interfaces';

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

}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InMemoryTodoRepository } from './app.todo.repository';

@Module({
  controllers: [AppController],
  providers: [
    {
      provide: 'InMemoryTodoRepository',
      useClass: InMemoryTodoRepository,
    },
    AppService,
  ],
})

export class AppModule {}

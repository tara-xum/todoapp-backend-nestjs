import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });

  app.enableCors({
    origin: [
      // Vue dev server - replace with frontend server url when deployed
      'http://localhost:5173', 

    ],
    methods: ['GET', 'POST', 'PUT, PATCH', 'DELETE'],
    credentials: true,
  });


  await app.listen(3000);
}
bootstrap();

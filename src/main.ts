import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [`localhost:9092`],
      },
      consumer: {
        groupId: 'user-content-training-consumer',
      },
    },
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen();
}
bootstrap();

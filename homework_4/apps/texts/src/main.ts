import { NestFactory } from '@nestjs/core';
import { TextsModule } from './texts.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(TextsModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('TEXTS', true));
  await app.startAllMicroservices();
}
bootstrap();

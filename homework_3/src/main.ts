import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";


async function bootstrap() {
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle("NestJS + TypeScript, JWT-авторизация")
      .setDescription("Домащнее задание 3")
      .setVersion("1.0.0")
      .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document)

  //app.useGlobalPipes(new ValidationPipe())
  await app.listen(PORT, () => console.log(`Server is started on port = ${PORT}`));
}
bootstrap();

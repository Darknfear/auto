import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '@filters/http-exception.filter';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Api docs')
    .setDescription('Demo API Application')
    .setVersion('v1')
    .addBearerAuth()
    .build();
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());

  // exception
  app.useGlobalFilters(new HttpExceptionFilter());
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  await app.listen(process.env.PORT, () => {
    console.log(`Server is running in port::: ${process.env.PORT}`);
  });
}
bootstrap();

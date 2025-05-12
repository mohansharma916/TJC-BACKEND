import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    cors: {
      origin: '*', // Allow all origins
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove non-whitelisted properties
      forbidNonWhitelisted: true, // throw errors for non-whitelisted properties
      transform: true, // automatically transform payloads to DTO instances
    })
  );
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();

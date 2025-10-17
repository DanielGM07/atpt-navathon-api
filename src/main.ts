import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { TypeOrmExceptionFilter } from './common/filters/typeorm-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Configuración global
  app.setGlobalPrefix('/api');
  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalFilters(new TypeOrmExceptionFilter());

  // Swagger
  const configDoc = new DocumentBuilder()
    .setTitle("Hydroponic")
    .setDescription("Hydroponic description")
    .setVersion('1.0')
    .addTag('dental')
    .build();
  const document = SwaggerModule.createDocument(app, configDoc);
  SwaggerModule.setup('api/docs', app, document);

  // Puerto desde .env
  const config = app.get(ConfigService);
  const port = config.get<number>('PORT') || 3000;

  await app.listen(port);
  console.log(`Server running at http://localhost:${port}/api`);
  console.log(`Swagger available at http://localhost:${port}/api/docs`);
}

bootstrap();

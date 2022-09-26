import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { HttpExceptionFilter } from '@core/filters/http-exception.filter';
import { TransformInterceptor } from '@core/interceptors/transform.interceptor';
import {
  CorsOptions,
  CorsOptionsDelegate,
} from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('SERVER_PORT');
  const isProduction = process.env.NODE_ENV === 'production';
  const configValidations: ValidationPipeOptions = {
    whitelist: true,
  };
  const corsOptions: CorsOptions | CorsOptionsDelegate<any> = {
    origin: '*',
  };

  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe(configValidations));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors(corsOptions);

  if (!isProduction) {
    const config = new DocumentBuilder()
      .setTitle('GCBA Digitalización Docs')
      .setDescription('The gcba API description')
      .setVersion('1.0.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  await app.listen(PORT);
  logger.log(`[Application listening] on port ${PORT}`);
}
bootstrap();

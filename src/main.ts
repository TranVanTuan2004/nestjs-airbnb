import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './core/transform.interceptor';
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  let reflector = app.get(Reflector)
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor(reflector))


  // Cấu hình tiền tố 'api' cho tất cả các route
  app.setGlobalPrefix('api');
  
  const config = new DocumentBuilder()
    .setTitle('Nestjs')
    .setDescription('All Modules API')
    .setVersion('1.0')
    .addTag('default')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
        in: 'header',
      }
      , 'token',)
    .addSecurityRequirements('token')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      }
    });
  await app.listen(configService.get<string>('PORT'));
}
bootstrap()
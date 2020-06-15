import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 使用全局管道
  app.useGlobalPipes(new ValidationPipe())

  // swagger接口文档配置
  const options = new DocumentBuilder()
    .setTitle('Nest-js-blog-api')
    .setDescription('the nestjs blog api description')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  // 接口文档路径
  SwaggerModule.setup('/api-docs', app, document)
  await app.listen(5000);
}
bootstrap();

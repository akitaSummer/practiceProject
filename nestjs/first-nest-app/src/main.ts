import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { logger } from './common/middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost)

  app.use(logger) // 全局中间件
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))
  await app.listen(3000);
}
bootstrap();

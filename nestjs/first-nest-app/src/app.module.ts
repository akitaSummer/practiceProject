import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggerMiddleware)
    // .forRoutes('cats')
    // .forRoutes({ path: 'cats', method: RequestMethod.GET })
    .exclude(
      { path: 'cats', method: RequestMethod.GET },
      { path: 'cats', method: RequestMethod.POST },
      'cats/(.*)'
    )
    .forRoutes(CatsController)
  }
}

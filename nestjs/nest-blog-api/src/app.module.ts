import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypegooseModule } from 'nestjs-typegoose'

@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost/nest-blog-api', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    }) // 连接数据库
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

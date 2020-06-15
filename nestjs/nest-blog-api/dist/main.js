"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const mongoose = require("mongoose");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    mongoose.connect('mongodb://localhost/nest-blog-api', {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Nest-js-blog-api')
        .setDescription('the nestjs blog api description')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('/api-docs', app, document);
    await app.listen(5000);
}
bootstrap();
//# sourceMappingURL=main.js.map
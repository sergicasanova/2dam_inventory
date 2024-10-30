import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { authorizationMiddleware } from './authorization.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(authorizationMiddleware);
  await app.listen(3000);
}
bootstrap();

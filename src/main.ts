import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app: INestApplication = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	await app.listen(3000);
}

bootstrap();

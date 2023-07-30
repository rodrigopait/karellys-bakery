import { Module } from '@nestjs/common';
import { MongoModule } from './mongo.module';
import { ConfigModule } from './config.module';

@Module({
	imports: [ConfigModule, MongoModule],
	exports: [ConfigModule, MongoModule],
})
export class CommonModule {}

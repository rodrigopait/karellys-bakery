import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { RoleModule } from '../role/role.module';
import { UserController } from './user.controller';

@Module({
	imports: [
		RoleModule,
		MongooseModule.forFeature([
			{
				name: 'User',
				schema: UserSchema,
			},
		]),
	],
	providers: [UserService],
	controllers: [UserController],
})
export class UserModule {}

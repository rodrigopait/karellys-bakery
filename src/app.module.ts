import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { RoleModule } from './role/role.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';

@Module({
	imports: [
		UserModule,
		CommonModule,
		RoleModule,
		DevtoolsModule.register({
			http: process.env.NODE_ENV !== 'production',
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}

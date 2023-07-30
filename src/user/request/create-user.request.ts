import { Role } from '../../role/role.schema';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserRequest {
	@IsString()
	@IsNotEmpty()
	firstName: string;

	@IsString()
	@IsNotEmpty()
	lastName: string;

	@IsEmail()
	@IsNotEmpty()
	email!: string;

	role: Role;
}

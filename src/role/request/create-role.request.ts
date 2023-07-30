import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleRequest {
	@IsString()
	@IsNotEmpty()
	public name: string;
}

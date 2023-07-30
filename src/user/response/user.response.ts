import { Role } from '../../role/role.schema';
import { User } from '../user.schema';

export class UserResponse {
	public id: string;

	public firstName: string;

	public lastName: string;

	public email: string;

	public role: Role;

	constructor(user: User) {
		this.id = user.id.toString();
		this.firstName = user.firstName;
		this.lastName = user.lastName;
		this.email = user.email;
		this.role = user.role;
	}
}

import { Role } from '../role.schema';

export class RoleResponse {
	public id: string;

	public name: string;

	constructor(role: Role) {
		this.id = role.id.toString();
		this.name = role.name;
	}
}

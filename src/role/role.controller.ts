import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ListInput } from '../common/dto/list.input';
import { RoleService } from './role.service';
import { CreateRoleRequest } from './request/create-role.request';
import { RoleResponse } from './response/role.response';
import { Role } from './role.schema';

@Controller('Role')
export class RoleController {
	constructor(private readonly roleService: RoleService) {}

	@Post()
	async create(@Body() createRoleRequest: CreateRoleRequest): Promise<RoleResponse> {
		return new RoleResponse(await this.roleService.create(createRoleRequest));
	}

	@Get()
	async findAll(paginator: ListInput): Promise<RoleResponse[]> {
		return (await this.roleService.findAll(paginator)).map((role: Role) => new RoleResponse(role));
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<RoleResponse> {
		return new RoleResponse(await this.roleService.findOneById(id));
	}
}

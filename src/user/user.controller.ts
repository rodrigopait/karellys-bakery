import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequest } from './request/create-user.request';
import { User } from './user.schema';
import { ListInput } from '../common/dto/list.input';
import { UpdateUserRequest } from './request/update-user.request';
import { UserResponse } from './response/user.response';

@Controller('User')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	async create(@Body() createUserRequest: CreateUserRequest): Promise<UserResponse> {
		return new UserResponse(await this.userService.create(createUserRequest));
	}

	@Get()
	async findAll(paginator: ListInput): Promise<UserResponse[]> {
		return (await this.userService.findAll(paginator)).map((user: User) => new UserResponse(user));
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<UserResponse> {
		return new UserResponse(await this.userService.findOneById(id));
	}

	@Put(':id')
	async update(@Param('id') id: string, @Body() updateUserRequest: UpdateUserRequest): Promise<UserResponse> {
		return new UserResponse(await this.userService.update(id, updateUserRequest));
	}

	@Delete(':id')
	async delete(@Param('id') id: string): Promise<void> {
		return this.userService.delete(id);
	}
}

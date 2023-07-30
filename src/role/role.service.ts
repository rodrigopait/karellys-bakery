import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from './role.schema';
import { ListInput } from '../common/dto/list.input';
import { CreateRoleRequest } from './request/create-role.request';

@Injectable()
export class RoleService {
	constructor(
		@InjectModel('Role')
		private readonly roleModel: Model<Role>,
	) {}

	async create(createRoleInput: CreateRoleRequest): Promise<Role> {
		return new this.roleModel(createRoleInput).save();
	}

	async findAll(paginationQuery: ListInput): Promise<Role[]> {
		const { limit, offset } = paginationQuery;
		return this.roleModel.find().skip(offset).limit(limit).exec();
	}

	async findOneById(id: string): Promise<Role> {
		const role: Role = await this.roleModel.findOne({ _id: id }).exec();
		if (!role) {
			throw new NotFoundException(`Role ${id} not found`);
		}
		return role;
	}
}

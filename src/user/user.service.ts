import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserRequest } from './request/create-user.request';
import { UpdateUserRequest } from './request/update-user.request';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ListInput } from '../common/dto/list.input';
import { User } from './user.schema';

@Injectable()
export class UserService {
	constructor(
		@InjectModel('User')
		private readonly userModel: Model<User>,
	) {}

	async create(createUserInput: CreateUserRequest): Promise<User> {
		return new this.userModel(createUserInput).save();
	}

	async findAll(paginationQuery: ListInput): Promise<User[]> {
		const { limit, offset } = paginationQuery;
		return this.userModel.find().populate({ path: 'role', model: 'Role' }).skip(offset).limit(limit).exec();
	}

	async findOneById(id: string): Promise<User> {
		const user: User = await this.userModel.findOne({ _id: id }).populate({ path: 'role', model: 'Role' }).exec();
		if (!user) {
			throw new NotFoundException(`User ${id} not found`);
		}
		return user;
	}

	async update(id: string, updateUserInput: UpdateUserRequest): Promise<User> {
		const existingUser: User = await this.userModel
			.findOneAndUpdate({ _id: id }, { $set: updateUserInput }, { new: true })
			.exec();

		if (!existingUser) {
			throw new NotFoundException(`User ${id} not found`);
		}
		return existingUser;
	}

	async delete(id: string): Promise<void> {
		const user: User = await this.findOneById(id);
		await this.userModel.deleteOne(user).exec();
	}
}

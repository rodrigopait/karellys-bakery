import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ListInput } from '../common/dto/list.input';
import { Role } from '../role/role.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const user = new this.userModel(createUserInput);
    return user.save();
  }

  async findAll(paginationQuery: ListInput) {
    const { limit, offset } = paginationQuery;
    return this.userModel.find().populate({ path: 'role', model: Role.name }).skip(offset).limit(limit).exec();
  }

  async findOneById(id: string) {
    const user = await this.userModel.findOne({ _id: id }).populate({ path: 'role', model: Role.name }).exec();
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const existingUser = await this.userModel
      .findOneAndUpdate({ _id: id }, { $set: updateUserInput }, { new: true })
      .exec();

    if (!existingUser) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return existingUser;
  }

  async remove(id: string) {
    const user = await this.findOneById(id);
    return user.remove();
  }

  async getUsers(paginationQuery: ListInput) {
    const count = await this.userModel.count().exec();
    const users = await this.findAll(paginationQuery);
    return { users, count };
  }
}

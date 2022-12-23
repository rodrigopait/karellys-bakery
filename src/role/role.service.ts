import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types as MongooseTypes } from 'mongoose';
import { Role, RoleDocument } from './role.schema';
import { ListInput } from '../common/dto/list.input';
import { CreateRoleInput } from './inputs/create-role.input';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name)
    private readonly roleModel: Model<RoleDocument>,
  ) {}

  async create(createRoleInput: CreateRoleInput) {
    const role = new this.roleModel(createRoleInput);
    return role.save();
  }

  async findAll(paginationQuery: ListInput) {
    const { limit, offset } = paginationQuery;
    return this.roleModel.find().skip(offset).limit(limit).exec();
  }

  async findOneById(id: MongooseTypes.ObjectId) {
    const role = await this.roleModel.findOne({ _id: id }).exec();
    if (!role) {
      throw new NotFoundException(`Role ${id} not found`);
    }
    return role;
  }
}

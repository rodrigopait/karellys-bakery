import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.schema';
import { UpdateUserInput } from './dto/update-user.input';
import { ListInput } from '../common/dto/list.input';
import { ListUserResponse } from './dto/list-user.response';
import ConnectionArgs, { getPagingParameters } from '../common/relay/connection.args';
import { connectionFromArraySlice } from 'graphql-relay';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(User)
export class UserResolver {
  constructor(private usersService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll(@Args('listInput') listInput: ListInput) {
    return this.usersService.findAll(listInput);
  }

  @Query(() => User, { name: 'userById' })
  findOneById(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOneById(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.usersService.remove(id);
  }

  @Query(() => ListUserResponse, { name: 'listUsersWithCursor' })
  async findAllWithCursor(@Args('args') args: ConnectionArgs): Promise<ListUserResponse> {
    const { limit, offset } = getPagingParameters(args);
    const { users, count } = await this.usersService.getUsers({
      limit,
      offset,
    });
    const page = connectionFromArraySlice(users, args, {
      sliceStart: offset || 0,
      arrayLength: count,
    });
    return { page, pageData: { count, limit, offset } };
  }
}

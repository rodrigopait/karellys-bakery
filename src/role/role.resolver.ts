import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from './role.schema';
import { RoleService } from './role.service';
import { CreateRoleInput } from './inputs/create-role.input';
import { ListInput } from '../common/dto/list.input';

@Resolver(() => Role)
export class RoleResolver {
  constructor(private roleService: RoleService) {}

  @Mutation(() => Role)
  createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    return this.roleService.create(createRoleInput);
  }

  @Query(() => [Role], { name: 'roles' })
  findAll(@Args('listInput') listInput: ListInput) {
    return this.roleService.findAll(listInput);
  }
}

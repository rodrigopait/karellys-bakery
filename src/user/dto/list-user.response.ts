import { User } from '../user.schema';
import { ObjectType } from '@nestjs/graphql';
import { RelayTypes } from '../../common/relay/relay.types';

@ObjectType()
export class ListUserResponse extends RelayTypes<User>(User) {}

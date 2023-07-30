import { CreateUserRequest } from './create-user.request';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserRequest extends PartialType(CreateUserRequest) {}

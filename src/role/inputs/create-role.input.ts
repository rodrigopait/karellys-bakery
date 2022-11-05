import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRoleInput {
  @Field(() => String, { description: 'first name of the role' })
  name: string;
}

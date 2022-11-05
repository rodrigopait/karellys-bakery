import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Document, Types as MongooseTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../role/role.schema';

@Schema()
@ObjectType()
export class User {
  @Field(() => ID)
  id: MongooseTypes.ObjectId;

  @Prop()
  @Field(() => String, { description: 'User firstName ' })
  firstName!: string;

  @Prop()
  @Field(() => String, { description: 'User lastName ' })
  lastName!: string;

  @Prop()
  @Field(() => String, { description: 'User email ' })
  email!: string;

  @Prop({ type: MongooseTypes.ObjectId, ref: 'Role' })
  @Field(() => Role, { description: 'User role ' })
  role: Role;
}
export type UserDocument = User | Document;
export const UserSchema = SchemaFactory.createForClass(User);

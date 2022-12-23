import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Document, Types as MongooseTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class Role {
  @Field(() => ID)
  id: MongooseTypes.ObjectId;

  @Prop()
  @Field(() => String, { description: 'Role firstName ' })
  name!: string;
}
export type RoleDocument = Role | Document;
export const RoleSchema = SchemaFactory.createForClass(Role);

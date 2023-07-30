import { Schema as MongooseSchema, Types as MongooseTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../role/role.schema';

@Schema()
export class User {
	public id: MongooseTypes.ObjectId;

	@Prop()
	public firstName!: string;

	@Prop()
	public lastName!: string;

	@Prop()
	public email!: string;

	@Prop({ type: MongooseTypes.ObjectId, ref: 'Role' })
	public role: Role;
}

export const UserSchema: MongooseSchema<User> = SchemaFactory.createForClass(User);

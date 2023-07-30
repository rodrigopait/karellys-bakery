import { Schema as MongooseSchema, Types as MongooseTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Role {
	id: MongooseTypes.ObjectId;

	@Prop()
	name!: string;
}

export const RoleSchema: MongooseSchema<Role> = SchemaFactory.createForClass(Role);

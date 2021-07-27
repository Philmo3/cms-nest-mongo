import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Company } from 'src/company/company.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
	@Prop({ required: true })
	name: string;

	@Prop({ required: true })
	lastName: string;

	@Prop({ unique: true, required: true })
	email: string;

	@Prop({ required: true, select: false })
	password: string;

	@Prop({
		required: true,
		type: SchemaTypes.ObjectId,
		ref: 'companies',
	})
	company: Types.ObjectId;
}

export const UserShema = SchemaFactory.createForClass(User);

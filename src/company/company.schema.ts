import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type CompanyDocument = Company & Document;

@Schema()
export class Company {
	@Prop({ required: true })
	name: string;

	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ required: true })
	phone: string;

	@Prop({ required: true })
	contactPerson: string;

	@Prop({ required: true })
	country: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);

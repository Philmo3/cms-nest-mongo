import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type SiteDocument = Site & Document;

@Schema()
export class Site {
	@Prop({ required: true, unique: true })
	name: string;

	@Prop({ required: true, unique: true })
	key: string;

	@Prop()
	description: string;

	@Prop()
	hostUrl: string;

	@Prop()
	siteImageUrl: string;

	@Prop({
		required: true,
		type: SchemaTypes.ObjectId,
		ref: 'companies',
	})
	company: Types.ObjectId;
}

export const SiteShema = SchemaFactory.createForClass(Site);

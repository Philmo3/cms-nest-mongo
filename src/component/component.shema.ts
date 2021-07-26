import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
	ComponentResource,
	ComponentResourceShema,
} from './componentResource.shema';

export type ComponentDocument = Component & Document;

@Schema()
export class Component {
	@Prop({ required: true, unique: true })
	name: string;

	@Prop({ type: [ComponentResourceShema], ref: 'ComponentResources' })
	resources: ComponentResource[];

	@Prop({ default: true })
	isAvailable: boolean;
}

export const ComponentShema = SchemaFactory.createForClass(Component);

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type ComponentResourceDocument = ComponentResource & Document

@Schema()
export class ComponentResource{
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    type: string;
}

export const ComponentResourceShema = SchemaFactory.createForClass(ComponentResource)
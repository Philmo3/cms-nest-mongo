import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    lastName: string;

    @Prop({unique: true, required: true})
    email: string;

    @Prop({required: true, select: false})
    password: string;
}


export const UserShema = SchemaFactory.createForClass(User);
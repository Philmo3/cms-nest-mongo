import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument } from "./user.shema";

@Injectable()
export class UserService{
    constructor(@InjectModel('users') private userModel: Model<UserDocument>){}

    async search(): Promise<UserDocument[]>{
        return this.userModel.find().exec()
    }
}
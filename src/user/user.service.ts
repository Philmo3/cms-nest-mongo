import { Injectable, UseFilters } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDto } from "src/resources/dtos/user.dto";
import { CmsBadRequestExeption } from "src/resources/exeptions/badRequest.exeption";
import { CmsBadRequestFilter } from "src/resources/exeptions/badRequest.filter";
import { UserDocument } from "./user.shema";
import * as bcrypt from 'bcrypt'

@UseFilters(CmsBadRequestFilter)
@Injectable()
export class UserService{
    constructor(@InjectModel('users') private userModel: Model<UserDocument>){}

    async search(): Promise<UserDocument[]>{
        return this.userModel.find().exec()
    }

    async findByEmail(email: string): Promise<UserDocument>{
        return await this.userModel.findOne({email}).exec();
    }

    async create(user: UserDto){

        const userExist = await this.findByEmail(user.email);

        if(userExist){
            throw new CmsBadRequestExeption('A user with this email already exist', UserService.name);
        }

        const hashPaswword = await bcrypt.hash(user.password, 10);

        user.password = hashPaswword;

        const newUser = new this.userModel(user).save();

        return newUser;
    }
}
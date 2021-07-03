import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ComponentDto } from "src/resources/dtos/components.dto";
import { ComponentSerializer } from "src/resources/serializer/component.serializer";
import { ComponentDocument } from "./component.shema";
import { ComponentResourceDocument } from "./componentResource.shema";

@Injectable()
export class ComponentService{

    constructor(
        @InjectModel('components') private componentModel: Model<ComponentDocument>,
        @InjectModel('componentResources') private componentResourceModel: Model<ComponentResourceDocument>
        ){}

    async search(){
        return await this.componentModel.find({}, {name: 1}).exec();
    }

    async create(componentDto: ComponentDto){


        const newComponentDocument = new this.componentModel({
            name: componentDto.name,
            resources: componentDto.resources, 
            isAvailable: componentDto.isAvailable
        });


        return newComponentDocument.save();
    }
}
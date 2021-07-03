import { Injectable, UseFilters } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ComponentDto } from "src/resources/dtos/components.dto";
import { CmsBadRequestExeption } from "src/resources/exeptions/badRequest.exeption";
import { CmsBadRequestFilter } from "src/resources/exeptions/badRequest.filter";
import { ComponentDocument } from "./component.shema";

@UseFilters(CmsBadRequestFilter)
@Injectable()
export class ComponentService{

    constructor(
        @InjectModel('components') private componentModel: Model<ComponentDocument>
        ){}

    async search(){
        return await this.componentModel.find({isAvailable: true}, {name: 1}).exec();
    }

    async create(componentDto: ComponentDto){

        const componentWithSameName = await this.componentModel.find({name: componentDto.name}).exec();
        
        if(componentWithSameName.length > 0){
            throw new CmsBadRequestExeption('A component with this name already exist', ComponentService.name)
        }

        const newComponentDocument = new this.componentModel({
            name: componentDto.name,
            resources: componentDto.resources, 
            isAvailable: componentDto.isAvailable
        });


        return newComponentDocument.save();
    }
}
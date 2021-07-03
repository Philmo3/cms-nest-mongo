import { Body, Controller, Get, Post, ValidationPipe } from "@nestjs/common";
import { ComponentDto } from "src/resources/dtos/components.dto";
import { ComponentService } from "./component.service";

@Controller('v1/components')
export class ComponentController{
    constructor(private readonly componentService: ComponentService){}

    @Get()
    async search(){
        return await this.componentService.search();
    }

    @Post()
    async create(@Body(new ValidationPipe()) componentDto: ComponentDto ){
        return await this.componentService.create(componentDto)
    }
}
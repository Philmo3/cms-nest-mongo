import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ComponentController } from "./component.controller";
import { ComponentService } from "./component.service";
import { ComponentShema } from "./component.shema";
import { ComponentResourceShema } from "./componentResource.shema";

@Module({
    imports: [MongooseModule.forFeature([
        {name: 'components', schema: ComponentShema},
        {name: 'componentResources', schema: ComponentResourceShema}
    ])],
    controllers: [ComponentController],
    providers: [ComponentService]
})
export class ComponentModule{}
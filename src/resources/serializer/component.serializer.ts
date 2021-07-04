import { Document } from "mongoose";
import { ComponentDocument } from "src/component/component.shema";
import { ComponentDto } from "../dtos/components.dto";
import { ISerializer } from "./Iserializer";

export class ComponentSerializer implements ISerializer<ComponentDocument>{
    
    documentToDto(document: Document<ComponentDocument, any>) {
        throw new Error("Method not implemented.");
    }

    dtoToDocument(dto: ComponentDto) {
        return {
            ...dto,
            resources: undefined
        }
    }

}
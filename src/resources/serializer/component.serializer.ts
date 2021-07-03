import { ComponentDto } from "../dtos/components.dto";
import { ISerializer } from "./Iserializer";

export class ComponentSerializer implements ISerializer{
    dtoToDocument(dto: ComponentDto) {
        return {
            ...dto,
            resources: undefined
        }
    }

}
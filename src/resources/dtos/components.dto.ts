import { IsArray, IsBoolean, IsString } from "class-validator";
import { ComponentResourceDto } from "./componentResource.dto";

export class ComponentDto{
    @IsString()
    name: string;
    
    @IsArray()
    resources: ComponentResourceDto[];

    @IsBoolean()
    isAvailable: boolean;
}
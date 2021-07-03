import { IsString } from "class-validator";

export class ComponentResourceDto{
    @IsString()
    name: string;

    @IsString()
    type: string;
}
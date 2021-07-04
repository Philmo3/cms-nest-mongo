import {Document} from 'mongoose'

export interface ISerializer<T extends Document>{
    dtoToDocument(dto);

    documentToDto(document:T);
}
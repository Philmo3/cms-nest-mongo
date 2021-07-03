

import { CmsExeptionError } from "./cmsExeption";

export class CmsBadRequestExeption extends CmsExeptionError{
   
    constructor(message: string, origin: string){
        super(400, message, 400, origin );
    } 
    
}
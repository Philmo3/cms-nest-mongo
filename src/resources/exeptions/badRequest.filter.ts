import { ArgumentsHost, Catch } from "@nestjs/common";
import { CmsBadRequestExeption } from "./badRequest.exeption";
import { CmsExeptionError } from "./cmsExeption";
import { CmsExeptionFilter } from "./cmsExeptionFilter";

@Catch(CmsBadRequestExeption)
export class CmsBadRequestFilter extends CmsExeptionFilter{

    constructor(){
        super();
        console.log('new bad request filter')
    }

    catch(exception: CmsExeptionError, host: ArgumentsHost) {
        console.log('in cms bar request catch')
        this.sendError(host, exception)
    }

}
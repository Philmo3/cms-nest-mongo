import { ArgumentsHost, Catch } from "@nestjs/common";
import { CmsBadRequestExeption } from "./badRequest.exeption";
import { CmsExeptionError } from "./cmsExeption";
import { CmsExeptionFilter } from "./cmsExeptionFilter";

@Catch(CmsBadRequestExeption)
export class CmsBadRequestFilter extends CmsExeptionFilter{

    constructor(){
        super();
    }

    catch(exception: CmsExeptionError, host: ArgumentsHost) {
        this.sendError(host, exception)
    }

}
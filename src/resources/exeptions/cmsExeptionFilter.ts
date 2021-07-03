import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { CmsExeptionError } from "./cmsExeption";
import {Response} from 'express'
import { CmsBadRequestExeption } from "./badRequest.exeption";

export abstract class CmsExeptionFilter implements ExceptionFilter<CmsExeptionError>{

    abstract catch(exception: CmsExeptionError, host: ArgumentsHost);

    protected sendError(host: ArgumentsHost, exeption: CmsBadRequestExeption){
        const httpContext = host.switchToHttp();
        
        httpContext.getResponse<Response>()
            .status(exeption.statusCode)
            .json({
                code: exeption.statusCode,
                errorMessage: exeption.errorMessage,
                origin: exeption.origin
            });
    }
}
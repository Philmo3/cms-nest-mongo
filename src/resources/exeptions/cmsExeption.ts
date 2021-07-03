import { HttpException } from "@nestjs/common";



export abstract class CmsExeptionError extends HttpException{

    constructor(
        public exceptionCode: number, 
        public errorMessage: string, 
        public statusCode: number, 
        public origin: string
        ) {
        super({ exceptionCode: exceptionCode, errorMessage: errorMessage, origin: origin }, statusCode);
    }

}
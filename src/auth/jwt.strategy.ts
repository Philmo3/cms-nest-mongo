import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import {Request} from 'express'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest:  ExtractJwt.fromExtractors([(request: Request) => cookieExtractor(request)]) ,
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validate(payload: {username: string, sub: string}) {
        return { userId: payload.sub, username: payload.username };
      }
}

function cookieExtractor(request: Request){
    return request?.cookies?.Authentification;
}
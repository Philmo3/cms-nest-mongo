import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import {Request} from 'express'

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh-strategy'){
    constructor(){
        super({
            jwtFromRequest:  ExtractJwt.fromExtractors([
                (request: Request) => request?.cookies?.refresh
            ]) ,
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        })
    }

    validate(payload: {username: string, sub: string}) {
      return { userId: payload.sub, username: payload.username };
    }
}
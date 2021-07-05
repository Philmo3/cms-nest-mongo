import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './auth.controller';
import * as bcrypt from 'bcrypt'
import { UserSerializer } from 'src/resources/serializer/user.serializer';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/user/user.shema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
        ){}

    async validateUser(loginDto: LoginDto ){
        const {email, password} = loginDto;

        const user = await this.userService.findByEmailForLogin(email);
   
        if(user){
           const passwordIsValid = bcrypt.compareSync(password, user.password);
           if(passwordIsValid){
              return new UserSerializer().documentToDto(user);
           }
        }
        return null;
    }

    /**
     * @returns A new JWT as a cookie
     */
    async login(user: UserDocument){
        const payload = { username: user.email, sub: user._id };
        return {
            loginCookie: this.jwtLoginCookie(payload),
            refreshCookie: this.jwtRefreshCookie(payload)
        }
    }

    async retrieveUser(userId: string){
        return this.userService.findById(userId);
    }

    private jwtLoginCookie(payload: {username: string, sub: string}){
        const token = this.jwtService.sign(payload);
        return `Authentification=${token}; HttpOnly; Path=/;`;
    }

    private jwtRefreshCookie(payload: {username: string, sub: string}){
        const expiresSeconds = `${this.configService.get('JWT_REFRESH_TTL')}s`

        const token = this.jwtService.sign(payload, {
            expiresIn: expiresSeconds
        });
        return `refresh=${token}; HttpOnly; Path=/; Max-Age=${expiresSeconds}`;
    }
}

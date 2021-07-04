import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './auth.controller';
import * as bcrypt from 'bcrypt'
import { UserSerializer } from 'src/resources/serializer/user.serializer';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/user/user.shema';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
        ){}

    async validateUser(loginDto: LoginDto ){
        const {email, password} = loginDto;

        const user = await this.userService.findByEmail(email);
 
        if(user){
           const passwordIsValid = bcrypt.compareSync(password, user.password);
           if(passwordIsValid){
              return new UserSerializer().documentToDto(user);
           }
        }
        return null;
    }

    async login(user: UserDocument){
     
        const payload = { username: user.email, sub: user._id };
   
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}

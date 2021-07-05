import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { IsEmail, IsString } from 'class-validator';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { JwtRefreshAuthGuard } from 'src/guards/jwtRefresh.guard';
import { LocalAuthGuard } from 'src/guards/local.guard';
import WithUserRequest from 'src/resources/requests/withUser.request';
import { UserDocument } from 'src/user/user.shema';
import { AuthService } from './auth.service';

export class LoginDto{

    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    password: string;
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @UseGuards(JwtAuthGuard)
    @Post('me')
    async whoAmI(@Req() req: any){
        return await this.authService.retrieveUser(req.user.userId);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req: WithUserRequest, @Res() response: Response){
        const cookie = await this.authService.login(req.user);
        response.setHeader('Set-Cookie',[ cookie.loginCookie,cookie.refreshCookie]);
        return response.send(req.user)
    }

    @UseGuards(JwtRefreshAuthGuard)
    @Post('refresh')
    async refresh(@Req() req: any, @Res() response: Response){
        const cookie = await this.authService.login(await this.authService.retrieveUser(req.user.userId) as UserDocument);
        response.setHeader('Set-Cookie',[ cookie.loginCookie,cookie.refreshCookie]);
        return response.send(req.user)
    }
}



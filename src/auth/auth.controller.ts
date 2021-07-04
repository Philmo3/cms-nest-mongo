import {  Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IsEmail, IsString } from 'class-validator';
import { LocalAuthGuard } from 'src/guards/local.guard';
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

    @UseGuards(LocalAuthGuard)
    @Post()
    async login(@Request() req){
        return [await this.authService.login(req.user), req.user]
    }
}



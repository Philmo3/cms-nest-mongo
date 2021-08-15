import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtCompanyGuard extends AuthGuard('jwt-auth-company') {}

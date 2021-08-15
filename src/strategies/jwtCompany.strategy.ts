import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class JwtAuthenticateCompanyStrategy extends PassportStrategy(
	Strategy,
	'jwt-auth-company',
) {
	constructor(private authService: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => request?.cookies?.Authentification,
			]),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET,
		});
	}

	async validate(payload: { username: string; sub: string }) {
		const user = await this.authService.retrieveUser(payload.sub);

		if (!user || !user.company) {
			throw new UnauthorizedException('Could not match any user');
		}

		return user;
	}
}

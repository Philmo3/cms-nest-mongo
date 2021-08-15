import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super();
	}

	async validate(username: string, password: string) {
		const user = await this.authService.validateUser({
			email: username,
			password,
		});

		if (!user) {
			throw new UnauthorizedException('Could not match any user');
		}

		return user;
	}
}

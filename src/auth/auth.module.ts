import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { LocalStrategy } from 'src/strategies/local.strategy';
import { JwtRefreshStrategy } from 'src/strategies/jwtRefresh.strategy';
import { JwtAuthenticateUserStrategy } from 'src/strategies/jwtAuthentificateUser.strategy';
import { JwtCompanyGuard } from 'src/guards/jwtCompany.guard';
import { JwtAuthenticateCompanyStrategy } from 'src/strategies/jwtCompany.strategy';

@Module({
	imports: [
		UsersModule,
		PassportModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get('JWT_SECRET'),
				signOptions: {
					expiresIn: '60s',
				},
			}),
			inject: [ConfigService],
		}),
	],
	providers: [
		AuthService,
		UserService,
		LocalStrategy,
		JwtStrategy,
		JwtRefreshStrategy,
		JwtAuthenticateUserStrategy,
		JwtAuthenticateCompanyStrategy,
	],
	controllers: [AuthController],
})
export class AuthModule {}

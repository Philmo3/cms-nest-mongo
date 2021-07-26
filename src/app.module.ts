import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './user/user.module';
import { ComponentModule } from './component/component.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CompanyController } from './company/company.controller';
import { CompanyModule } from './company/company.module';

@Module({
	imports: [
		MongooseModule.forRoot('mongodb://localhost:27017/cms', {
			useCreateIndex: true,
		}),
		UsersModule,
		ComponentModule,
		AuthModule,
		CompanyModule,
		ConfigModule.forRoot({
			envFilePath: '.env',
			isGlobal: true,
		}),
		CompanyModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

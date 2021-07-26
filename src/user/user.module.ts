import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from 'src/company/company.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserShema } from './user.shema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'users', schema: UserShema }]),
		CompanyModule,
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [MongooseModule],
})
export class UsersModule {}

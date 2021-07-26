import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/user/user.module';
import { CompanyController } from './company.controller';
import { CompanySchema } from './company.schema';
import { CompanyService } from './company.service';

@Module({
	controllers: [CompanyController],
	imports: [
		MongooseModule.forFeature([{ name: 'companies', schema: CompanySchema }]),
	],
	providers: [CompanyService],
	exports: [MongooseModule],
})
export class CompanyModule {}

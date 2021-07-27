import {
	Body,
	Controller,
	Get,
	Query,
	Post,
	ValidationPipe,
} from '@nestjs/common';
import { CompanyDto } from 'src/resources/dtos/company.dto';
import { CompanyService } from './company.service';

@Controller('v1/company')
export class CompanyController {
	constructor(private companyService: CompanyService) {}

	@Get('by-email')
	async getByEmail(@Query('email') email: string) {
		console.log(email);
		return await this.companyService.findByEmail(email);
	}

	@Post()
	async create(@Body(new ValidationPipe()) company: CompanyDto) {
		console.log('hello');
		return await this.companyService.create(company);
	}
}

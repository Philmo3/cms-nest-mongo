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
		return await this.companyService.findByEmail(email);
	}

	@Post()
	async create(@Body(new ValidationPipe()) company: CompanyDto) {
		return await this.companyService.create(company);
	}
}

import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CompanyDto } from 'src/resources/dtos/company.dto';
import { CompanyService } from './company.service';

@Controller('v1/company')
export class CompanyController {
	constructor(private companyService: CompanyService) {}

	@Post()
	async create(@Body(new ValidationPipe()) company: CompanyDto) {
		console.log('hello');
		return await this.companyService.create(company);
	}
}

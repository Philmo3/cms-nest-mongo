import { IsString } from 'class-validator';

export class CompanyDto {
	@IsString()
	name: string;

	@IsString()
	email: string;

	@IsString()
	phone: string;

	@IsString()
	contactPerson: string;

	@IsString()
	country: string;
}

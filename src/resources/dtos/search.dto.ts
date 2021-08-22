import { IsNumber, IsString } from 'class-validator';

export class SearchDto {
	@IsNumber()
	page: number;

	@IsNumber()
	perPage?: number;

	@IsString()
	term?: string;
}

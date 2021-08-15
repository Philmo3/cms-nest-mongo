import { IsNumber } from 'class-validator';

export class SearchDto {
	@IsNumber()
	page: number;

	@IsNumber()
	perPage?: number;
}

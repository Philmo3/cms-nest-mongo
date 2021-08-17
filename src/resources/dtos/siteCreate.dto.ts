import { IsString } from 'class-validator';

export class SiteCreateDto {
	@IsString()
	name: string;

	@IsString()
	description: string;

	@IsString()
	hostUrl: string;

	companyId: string;

	siteImageUrl: string;
}

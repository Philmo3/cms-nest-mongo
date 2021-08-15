import { IsOptional, IsString } from 'class-validator';

export class SiteDto {
	@IsOptional()
	@IsString()
	id: string;

	@IsString()
	name: string;

	@IsString()
	key: string;

	@IsString()
	description: string;

	@IsString()
	hostUrl: string;

	@IsString()
	siteImageUrl: string;

	@IsString()
	companyId: string;
}

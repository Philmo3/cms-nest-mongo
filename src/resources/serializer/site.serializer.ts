import { env } from 'process';
import { SiteDocument } from 'src/sites/sites.shema';
import { SiteDto } from '../dtos/site.dto';
import { ISerializer } from './Iserializer';

export class SiteSerializer implements ISerializer<SiteDocument> {
	dtoToDocument(dto: any) {
		throw new Error('Method not implemented.');
	}
	documentToDto(document: SiteDocument): SiteDto {
		return {
			id: document._id as string,
			name: document.name,
			key: document.key,
			hostUrl: document.hostUrl,
			description: document.description,
			siteImageUrl: process.env.HOST + document.siteImageUrl,
			companyId: document.company as any,
		};
	}
}

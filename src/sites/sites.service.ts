import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { SiteDto } from 'src/resources/dtos/site.dto';
import { SiteCreateDto } from 'src/resources/dtos/siteCreate.dto';
import { SiteSearchDto } from 'src/resources/dtos/siteSearch.dto';
import { CmsBadRequestExeption } from 'src/resources/exeptions/badRequest.exeption';
import { SiteSerializer } from 'src/resources/serializer/site.serializer';
import { SiteDocument } from './sites.shema';

const cryptoJs = require('crypto-js');

import * as fs from 'fs';
import { appendPublicFile } from 'src/resources/functions/appendFile';

@Injectable()
export class SitesService {
	constructor(@InjectModel('sites') private siteModel: Model<SiteDocument>) {}

	async search(siteSearchDto: SiteSearchDto): Promise<SiteDto[]> {
		let searchQuery: any = {
			company: new ObjectId(siteSearchDto.companyId),
		};

		if (siteSearchDto.name) {
			searchQuery = {
				...searchQuery,
				name: { $regex: '.*' + siteSearchDto.name + '.*' },
			};
		}

		if (siteSearchDto.key) {
			searchQuery = { ...searchQuery, key: siteSearchDto.key };
		}

		const sites = await this.siteModel
			.find(searchQuery, null, {
				skip: (siteSearchDto.page - 1) * siteSearchDto.perPage,
				limit: siteSearchDto.perPage,
			})
			.exec();

		const siteSerializer = new SiteSerializer();

		const serializedSite: SiteDto[] = sites.map((site) => {
			return siteSerializer.documentToDto(site);
		});

		return serializedSite;
	}

	async create(
		siteDto: SiteCreateDto,
		siteImage: Express.Multer.File,
	): Promise<SiteDto> {
		const siteExist = await this.siteModel
			.find({ name: siteDto.name, company: siteDto.companyId })
			.exec();

		if (siteExist.length > 0) {
			throw new CmsBadRequestExeption(
				'A site with this name already exist inside your company',
				SitesService.name,
			);
		}

		// place the file if there is one
		if (siteImage) {
			siteDto.siteImageUrl = await appendPublicFile(siteImage);
		}

		const site = await new this.siteModel({
			...siteDto,
			company: siteDto.companyId,
			key: this.generateSiteKey(siteDto.name, siteDto.companyId),
		}).save();

		const siteSerializer = new SiteSerializer();

		return siteSerializer.documentToDto(site);
	}

	private generateSiteKey(name: string, companyId: string): string {
		return cryptoJs.AES.encrypt(
			name + companyId,
			process.env.SITE_SECRET,
		).toString();
	}
}

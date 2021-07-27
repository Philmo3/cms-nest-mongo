import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyDto } from 'src/resources/dtos/company.dto';
import { CmsBadRequestExeption } from 'src/resources/exeptions/badRequest.exeption';
import { CompanyDocument } from './company.schema';

@Injectable()
export class CompanyService {
	constructor(
		@InjectModel('companies') private companyModel: Model<CompanyDocument>,
	) {}

	async create(companyDto: CompanyDto): Promise<CompanyDocument> {
		const companyExist = await this.findByEmail(companyDto.email);
		console.log(companyExist);
		if (companyExist) {
			throw new CmsBadRequestExeption(
				'A company with this email already exist',
				CompanyService.name,
			);
		}

		const newCompany = await new this.companyModel(companyDto).save();

		return newCompany;
	}

	async findByEmail(email: string) {
		console.log(email);
		return await this.companyModel.findOne({ email }).exec();
	}
}

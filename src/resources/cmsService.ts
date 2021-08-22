import { Model } from 'mongoose';
import { PagniationResultDto } from './dtos/paginationResult.dto';

export class CmsService<documentType> {
	constructor(protected model: Model<any & Document>) {}

	async paginateQuery(
		query: {},
		skip: number,
		limit: number,
	): Promise<PagniationResultDto<documentType>> {
		const count = this.model.find(query).countDocuments().exec();
		const sites: Promise<documentType[]> = this.model
			.find(query)
			.skip(skip)
			.limit(limit)
			.exec();

		const [total, data] = await Promise.all([count, sites]);

		return {
			total,
			data,
			pages: Math.ceil(total / limit),
		};
	}
}

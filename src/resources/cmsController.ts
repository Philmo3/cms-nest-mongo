import { SearchDto } from './dtos/search.dto';

export class CmsController {
	constructor() {}

	preparePagination(dto: SearchDto) {
		dto.perPage = dto.perPage ? dto.perPage : 10;
		dto.page = dto.page ? dto.page : 1;
	}
}

export interface PagniationResultDto<documentType> {
	data: documentType[];
	total: number;
	pages: number;
}

export interface SerializePaginationResultDto {
	data: any[];
	total: number;
	pages: number;
}

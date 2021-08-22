import {
	Req,
	Query,
	Param,
	Post,
	Body,
	UseInterceptors,
	UploadedFile,
	ValidationPipe,
} from '@nestjs/common';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { JwtCompanyGuard } from 'src/guards/jwtCompany.guard';
import { CmsController } from 'src/resources/cmsController';
import { SerializePaginationResultDto } from 'src/resources/dtos/paginationResult.dto';

import { SiteDto } from 'src/resources/dtos/site.dto';
import { SiteCreateDto } from 'src/resources/dtos/siteCreate.dto';
import { SiteSearchDto } from 'src/resources/dtos/siteSearch.dto';
import { fileImageFilter } from 'src/resources/functions/fileImageFilter';
import WithUserRequest from 'src/resources/requests/withUser.request';
import { SitesService } from './sites.service';

@Controller('v1/sites')
export class SitesController extends CmsController {
	constructor(private SiteService: SitesService) {
		super();
	}

	@UseGuards(JwtCompanyGuard)
	@Get()
	async search(
		@Req() request: WithUserRequest,
		@Query() query: SiteSearchDto,
	): Promise<SerializePaginationResultDto> {
		this.preparePagination(query);

		query.companyId = (request.user.company as any)._id;

		return await this.SiteService.search(query);
	}

	@UseGuards(JwtCompanyGuard)
	@Get(':/key')
	async findByKey(@Req() request: Request, @Param('key') key: string) {}

	@UseGuards(JwtCompanyGuard)
	@Post()
	@UseInterceptors(
		FileInterceptor('siteImage', {
			fileFilter: fileImageFilter,
		}),
	)
	async create(
		@Req() request: WithUserRequest,
		@Body(new ValidationPipe()) siteDto: SiteCreateDto,
		@UploadedFile() file: Express.Multer.File,
	): Promise<SiteDto> {
		siteDto.companyId = (request.user.company as any)._id;

		return await this.SiteService.create(siteDto, file);
	}
}

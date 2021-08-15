import { Req, Query, Param, Post, Body } from '@nestjs/common';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { request, Request } from 'express';
import { JwtCompanyGuard } from 'src/guards/jwtCompany.guard';

import { SiteDto } from 'src/resources/dtos/site.dto';
import { SiteSearchDto } from 'src/resources/dtos/siteSearch.dto';
import { setDefaultPagination } from 'src/resources/functions/setDefaultPagination';
import WithUserRequest from 'src/resources/requests/withUser.request';
import { SitesService } from './sites.service';

@Controller('v1/sites')
export class SitesController {
	constructor(private SiteService: SitesService) {}

	@UseGuards(JwtCompanyGuard)
	@Get()
	async search(
		@Req() request: WithUserRequest,
		@Query() query: SiteSearchDto,
	): Promise<SiteDto[]> {
		setDefaultPagination(query);

		query.companyId = (request.user.company as any)._id;

		return await this.SiteService.search(query);
	}

	@UseGuards(JwtCompanyGuard)
	@Get(':/key')
	async findByKey(@Req() request: Request, @Param('key') key: string) {}

	@UseGuards(JwtCompanyGuard)
	@Post()
	async create(
		@Req() request: WithUserRequest,
		@Body() siteDto: SiteDto,
	): Promise<SiteDto> {
		siteDto.companyId = (request.user.company as any)._id;

		return await this.SiteService.create(siteDto);
	}
}

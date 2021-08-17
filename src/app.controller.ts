import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

import * as express from 'express';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}
}

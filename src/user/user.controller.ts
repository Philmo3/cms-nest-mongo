import {
	Body,
	Controller,
	Get,
	Query,
	Post,
	ValidationPipe,
} from '@nestjs/common';
import { UserDto } from 'src/resources/dtos/user.dto';
import { UserService } from './user.service';

@Controller('v1/users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async search() {
		return await this.userService.search();
	}

	@Get('by-email')
	async searchByEmail(@Query('email') email: string) {
		return await this.userService.findByEmail(email);
	}

	@Post()
	async create(@Body(new ValidationPipe()) userDto: UserDto) {
		return await this.userService.create(userDto);
	}
}

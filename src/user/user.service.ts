import { Injectable, UseFilters } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/resources/dtos/user.dto';
import { CmsBadRequestExeption } from 'src/resources/exeptions/badRequest.exeption';
import { CmsBadRequestFilter } from 'src/resources/exeptions/badRequest.filter';
import { UserDocument } from './user.shema';
import * as bcrypt from 'bcrypt';
import { UserSerializer } from 'src/resources/serializer/user.serializer';

@UseFilters(CmsBadRequestFilter)
@Injectable()
export class UserService {
	constructor(@InjectModel('users') private userModel: Model<UserDocument>) {}

	async search(): Promise<UserDocument[]> {
		return this.userModel.find().exec();
	}

	/**
	 * WARNING!!! this method should only be use for login purpose
	 * with this method the password is visible !!!WARNING
	 * @param email the email of the user
	 * @returns UserDocument
	 */
	async findByEmailForLogin(email: string): Promise<UserDocument> {
		return await this.userModel
			.findOne({ email }, { email: 1, password: 1, lastName: 1, name: 1 })
			.exec();
	}

	async findByEmail(email: string): Promise<UserDocument> {
		return await this.userModel.findOne({ email }).exec();
	}

	async findById(userId: string) {
		return await this.userModel.findById(userId).populate('company').exec();
	}

	async create(user: UserDto) {
		const userExist = await this.findByEmail(user.email);

		if (userExist) {
			throw new CmsBadRequestExeption(
				'A user with this email already exist',
				UserService.name,
			);
		}

		const hashPassword = await bcrypt.hash(user.password, 10);

		user.password = hashPassword;

		const newUser = await new this.userModel({
			...user,
			company: user.companyId,
		}).save();

		return new UserSerializer().documentToDto(newUser);
	}
}

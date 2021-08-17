import { Request } from 'express';
import { CmsBadRequestExeption } from '../exeptions/badRequest.exeption';

export const fileImageFilter = (
	req: Request,
	file: Express.Multer.File,
	callback: (error: Error, acceptFile: boolean) => void,
) => {
	if (!file.originalname.match(/\.(jpg|jpeg|png)/)) {
		return callback(
			new CmsBadRequestExeption(
				'Only jpg jpeg or png file extension will be accepted!',
				'file image filter',
			),
			false,
		);
	}
	return callback(null, true);
};

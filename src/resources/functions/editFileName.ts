import { Request } from 'express';

export const editFileName = (
	req: Request,
	file: Express.Multer.File,
	callback: (error: Error, filename: string) => void,
) => {
	let [originalName, fileExt] = file.originalname.split('.');

	originalName = originalName + '-' + new Date().getTime() + '.' + fileExt;

	callback(null, originalName);
};

import * as fs from 'fs';

export async function appendPublicFile(file: Express.Multer.File) {
	const [fileName, extension] = file.originalname.split('.');
	const fullFileName = fileName + '-' + new Date().getTime() + '.' + extension;
	fs.appendFileSync('uploads/' + fullFileName, file.buffer);

	return fullFileName;
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from 'src/company/company.module';
import { SitesController } from './sites.controller';
import { SitesService } from './sites.service';
import { SiteShema } from './sites.shema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'sites', schema: SiteShema }]),
		CompanyModule,
	],
	controllers: [SitesController],
	providers: [SitesService],
	exports: [MongooseModule],
})
export class SitesModule {}

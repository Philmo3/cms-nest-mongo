import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserShema } from "./user.shema";

@Module({
    imports: [MongooseModule.forFeature([{name: 'users', schema: UserShema}])],
    controllers: [UserController],
    providers: [UserService]
})
export class UsersModule{}
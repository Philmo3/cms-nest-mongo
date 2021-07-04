
import { UserDocument } from "src/user/user.shema";
import { ISerializer } from "./Iserializer";

export class UserSerializer implements ISerializer<UserDocument>{
    documentToDto(document: UserDocument) {
        const dtoDocument = document.toObject();
        dtoDocument.password = undefined;
        return dtoDocument;
    }

    dtoToDocument(dto: any) {
        throw new Error("Method not implemented.");
    }

}
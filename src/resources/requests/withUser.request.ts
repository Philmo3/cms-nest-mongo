import { Request } from "express";
import { UserDocument } from "src/user/user.shema";

interface WithUserRequest extends Request{
    user: UserDocument
}

export default WithUserRequest;
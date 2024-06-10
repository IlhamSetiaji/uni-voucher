import { IsNotEmpty, IsString } from "class-validator";

export interface IShowUserRequest {
    user_id: string
}

export class ShowUserRequest implements IShowUserRequest {
    @IsNotEmpty({
        message: "user id is required",
    })
    @IsString({
        message: "user id must be a string",
    })
    user_id!: string;
}
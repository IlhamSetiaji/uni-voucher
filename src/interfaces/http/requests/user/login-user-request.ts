import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export interface ILoginUserRequest {
  email: string;
  password: string;
}

export class LoginUserRequest implements ILoginUserRequest {
  @IsNotEmpty({
    message: "Email is required",
  })
  @IsEmail(
    {},
    {
      message: "Invalid email format",
    }
  )
  email!: string;

  @IsNotEmpty({
    message: "Password is required",
  })
  @IsString({
    message: "Password must be a string",
  })
  password!: string;
}

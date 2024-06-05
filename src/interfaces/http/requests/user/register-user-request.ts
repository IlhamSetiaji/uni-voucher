import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export interface IRegisterUserRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  role_id: string;
  gender: string;
  phone_number?: string;
}

export class RegisterUserRequest implements IRegisterUserRequest {
  @IsNotEmpty({
    message: "Name is required",
  })
  @IsString({
    message: "Name must be a string",
  })
  name!: string;

  @IsNotEmpty({
    message: "Username is required",
  })
  @IsString({
    message: "Username must be a string",
  })
  username!: string;

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

  @IsNotEmpty({
    message: "Role ID is required",
  })
  @IsString({
    message: "Role ID must be a string",
  })
  role_id!: string;

  @IsNotEmpty({
    message: "Gender is required",
  })
  @IsString({
    message: "Gender must be a string",
  })
  gender!: string;

  @IsString({
    message: "Phone number must be a string",
  })
  phone_number?: string;
}

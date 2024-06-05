import { IsNotEmpty, IsString } from "class-validator";

export interface ICreateRoleRequest {
  name: string;
  guard_name: string;
}

export class CreateRoleRequest implements ICreateRoleRequest {
  @IsNotEmpty({
    message: "name is required",
  })
  @IsString({
    message: "name must be a string",
  })
  name!: string;

  @IsNotEmpty({
    message: "guard_name is required",
  })
  @IsString({
    message: "guard_name must be a string",
  })
  guard_name!: string;
}

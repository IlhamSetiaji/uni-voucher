import bcrypt from "bcrypt";
import { UserEntity } from "../../../domains/entities/user-entity";
import type { UserRepositoryInterface } from "../../../domains/repositories/user/user-repository-interface";
import type { RegisterUserDTO } from "../../data-transfer-objects/user/register-user-dto";

export interface IRegisterUserUseCase {
  execute(data: RegisterUserDTO): Promise<UserEntity>;
}

export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(data: RegisterUserDTO): Promise<UserEntity> {
    // data.password = await Bun.password.hash(data.password);
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
    return this.userRepository.createUser(
      data.username,
      data.email,
      data.name,
      data.password,
      data.role_id,
      data.gender,
      data.phone_number
    );
  }
}

import bcrypt from 'bcrypt';
import { UserEntity } from "../../../domains/entities/user-entity";
import type { UserRepositoryInterface } from "../../../domains/repositories/user/user-repository-interface";
import type { LoginUserDTO } from "../../data-transfer-objects/user/login-user-dto";

export interface ILoginUserUseCase {
  execute(data: LoginUserDTO): Promise<UserEntity>;
}

export class LoginUserUseCase implements ILoginUserUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(data: LoginUserDTO): Promise<UserEntity> {
    const user = await this.userRepository.findUserByEmail(data.email);
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Password is invalid");
    }
    return user;
  }
}

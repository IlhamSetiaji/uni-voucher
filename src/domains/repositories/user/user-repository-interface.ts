import type { UserEntity } from "../../entities/user-entity";

export interface UserRepositoryInterface {
  findUserByEmail(email: string): Promise<UserEntity | null>;
  createUser(
    username: string,
    email: string,
    name: string,
    password: string,
    role_id: string,
    gender?: string,
    phone_number?: string
  ): Promise<UserEntity>;
}

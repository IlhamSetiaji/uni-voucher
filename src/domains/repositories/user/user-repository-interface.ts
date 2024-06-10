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
  updateUser(
    role_id: string,
    user_id: string,
    username: string,
    email: string,
    name: string,
    password: string,
    gender?: string,
    phone_number?: string
  ): Promise<UserEntity>
  findUserById(user_id: string): Promise<UserEntity | null>
  destroyUserByUserId(user_id: string): Promise<UserEntity | null>
}

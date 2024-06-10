import type { UserEntity } from "../../../domains/entities/user-entity";
import type { UserRepositoryInterface } from "../../../domains/repositories/user/user-repository-interface";

export interface IDestroyUserUseCase {
    execute(user_id: string): Promise<UserEntity | null>
}

export class DestroyUserUserCase{
    constructor(private readonly userRepository: UserRepositoryInterface){}
    async execute(user_id: string): Promise<UserEntity | null> {
        return this.userRepository.destroyUserByUserId(user_id);
    }
}
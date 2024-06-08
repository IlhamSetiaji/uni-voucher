import bcrypt from "bcrypt";
import type { UserEntity } from "../../../domains/entities/user-entity";
import type { UserRepositoryInterface } from "../../../domains/repositories/user/user-repository-interface";
import type { UpdateUserDTO } from "../../data-transfer-objects/user/update-user-dto";

export interface IUpdateUserCase {
    execute(data: UpdateUserDTO): Promise<UserEntity>
}

export class UpdateUserUseCase {
    constructor(private readonly userRepository: UserRepositoryInterface){}

    async execute(data: UpdateUserDTO): Promise<UserEntity>{
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);
        
        return this.userRepository.updateUser(
            data.role_id,
            data.user_id,
            data.username,
            data.email,
            data.name,
            data.password,
            data.gender,
            data.phone_number
        )
    }
}
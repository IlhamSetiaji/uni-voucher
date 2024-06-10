import type { RoleEntity } from "../../../domains/entities/role-entity";
import type { RoleRepositoryInterface } from "../../../domains/repositories/role/role-repository-interface";
import type { UpdateRoleDTO } from "../../data-transfer-objects/role/update-role-dto";

export interface IUpdateRoleUseCase {
    execute(data: UpdateRoleDTO, role_id: string): Promise<RoleEntity | null>
}

export class UpdateRoleUseCase {
    constructor(private readonly roleRepository: RoleRepositoryInterface){}
    async execute(data: UpdateRoleDTO, role_id: string): Promise<RoleEntity | null> {
        const role = await this.roleRepository.findRoleById(role_id)

        if(!role){
            throw new Error("Role not found")
        }

        return await this.roleRepository.updateRoleById(
            data.name,
            data.guard_name,
            role_id
        )
    }
}
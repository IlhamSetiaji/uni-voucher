import type { RoleEntity } from "../../../domains/entities/role-entity";
import type { RoleRepositoryInterface } from "../../../domains/repositories/role/role-repository-interface";

export interface IGetAllRoleUseCase {
    execute(search: string): Promise<RoleEntity | any>
}
export class GetAllRoleUseCase {
    constructor(private readonly roleRepository: RoleRepositoryInterface){}
    async execute(search: string): Promise<RoleEntity | any>{
        return await this.roleRepository.getAllRole(search)
    }
}
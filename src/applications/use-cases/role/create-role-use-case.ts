import type { RoleEntity } from "../../../domains/entities/role-entity";
import type { RoleRepositoryInterface } from "../../../domains/repositories/role/role-repository-interface";
import type { CreateRoleDTO } from "../../data-transfer-objects/role/create-role-dto";

export interface ICreateRoleUseCase {
  execute(data: CreateRoleDTO): Promise<RoleEntity>;
}

export class CreateRoleUseCase implements ICreateRoleUseCase {
  constructor(private roleRepository: RoleRepositoryInterface) {}

  async execute(data: CreateRoleDTO): Promise<RoleEntity> {
    const role = await this.roleRepository.findByName(data.name);

    if (role) {
      throw new Error("Role already exists");
    }

    const createdRole = await this.roleRepository.createRole(
      data.name,
      data.guard_name
    );

    return createdRole;
  }
}

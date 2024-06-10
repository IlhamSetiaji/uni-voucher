import type { RoleEntity } from "../../entities/role-entity";

export interface RoleRepositoryInterface {
  createRole(name: string, guard_name: string): Promise<RoleEntity>;
  findByName(name: string): Promise<RoleEntity | null>;
  getAllRole(search: string): Promise<RoleEntity | any>
  updateRoleById(name: string, guard_name: string, role_id: string): Promise<RoleEntity | null>
  findRoleById(role_id: string): Promise<RoleEntity | null>
}

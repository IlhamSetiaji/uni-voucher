import type { RoleEntity } from "../../entities/role-entity";

export interface RoleRepositoryInterface {
  createRole(name: string, guard_name: string): Promise<RoleEntity>;
  findByName(name: string): Promise<RoleEntity | null>;
}

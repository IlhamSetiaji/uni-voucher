import type { UserEntity } from "./user-entity";

export class RoleEntity {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly guard_name: string,
    readonly created_at: Date,
    readonly updated_at: Date,
    readonly users?: UserEntity[]
  ) {}
}

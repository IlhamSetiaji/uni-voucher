import type { RoleEntity } from "./role-entity";

export enum Gender {
  MALE,
  FEMALE,
}

export class UserEntity {
  constructor(
    readonly id: string,
    readonly username: string,
    readonly name: string,
    readonly email: string,
    readonly password: string,
    readonly gender?: Gender,
    readonly phone_number?: string,
    readonly created_at?: Date,
    readonly updated_at?: Date,
    readonly roles?: RoleEntity[]
  ) {}
}

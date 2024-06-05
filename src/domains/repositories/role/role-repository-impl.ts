import type { RoleRepositoryInterface } from "./role-repository-interface";
import { prisma } from "../../../infrastructures/database/prisma-client";
import { RoleEntity } from "../../entities/role-entity";

export class RoleRepositoryImpl implements RoleRepositoryInterface {
  createRole = async (
    name: string,
    guard_name: string
  ): Promise<RoleEntity> => {
    try {
      const [role] = await prisma.$transaction([
        prisma.role.create({
          data: { name, guard_name },
        }),
      ]);
      return new RoleEntity(
        role.id,
        role.name,
        role.guard_name,
        role.created_at,
        role.updated_at
      );
    } catch (error) {
      throw "[RoleRepositoryImpl] createRole error: " + error;
    }
  };

  findByName = async (name: string): Promise<RoleEntity | null> => {
    try {
      const role = await prisma.role.findUnique({
        where: { name },
      });
      if (!role) return null;
      return new RoleEntity(
        role.id,
        role.name,
        role.guard_name,
        role.created_at,
        role.updated_at
      );
    } catch (error) {
      throw "[RoleRepositoryImpl] findByName error: " + error;
    }
  };
}

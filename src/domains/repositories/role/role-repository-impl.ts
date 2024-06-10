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

  getAllRole = async(search: string): Promise<RoleEntity | any> => {
    try {
      return await prisma.role.findMany()
    } catch (error) {
      throw "[RoleRepositoryImpl] getAllRole error: " + error;
    }
  }

  findRoleById = async(role_id: string): Promise<RoleEntity | null> => {
    try {
      const role = await prisma.role.findUnique({
        where: {
          id: role_id
        }
      })

      if(!role){
        return null
      }

      return new RoleEntity(
        role.id,
        role.name,
        role.guard_name,
        role.created_at,
        role.updated_at
      )
    } catch (error) {
      throw "[RoleRepositoryImpl] findRoleById error: " + error;
    }
  }

  updateRoleById = async(name: string, guard_name: string, role_id: string): Promise<RoleEntity | null> => {
    try {
      const [updatedRole] = await prisma.$transaction([
        prisma.role.update({
          where: {
            id: role_id
          },
          data: {
            name: name,
            guard_name: guard_name  
          }
        })
      ])

      return new RoleEntity(
        updatedRole.id,
        updatedRole.name,
        updatedRole.guard_name,
        updatedRole.created_at,
        updatedRole.updated_at
      )

    } catch (error) {
      throw "[RoleRepositoryImpl] updateRoleById error: " + error;
    }
  }
}

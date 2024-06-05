import type { UserRepositoryInterface } from "./user-repository-interface";
import { prisma } from "../../../infrastructures/database/prisma-client";
import { UserEntity } from "../../entities/user-entity";
import { Gender } from "@prisma/client";

export class UserRepositoryImpl implements UserRepositoryInterface {
  findUserByEmail = async (email: string): Promise<UserEntity | null> => {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
        include: {
          roles: {
            include: { role: true },
          },
        },
      });
      if (!user) return null;
      return new UserEntity(
        user.id,
        user.username,
        user.name!,
        user.email,
        user.password,
        user.gender! as any,
        user.phone_number ?? "",
        user.created_at,
        user.updated_at,
        user.roles.map((role) => role.role)
      );
    } catch (error) {
      throw "[UserRepositoryImpl] findUserByEmail error: " + error;
    }
  };

  createUser = async (
    username: string,
    email: string,
    name: string,
    password: string,
    role_id: string,
    gender?: string,
    phone_number?: string
  ) => {
    try {
      const [createdUser] = await prisma.$transaction([
        prisma.user.create({
          data: {
            username: username,
            email: email,
            name: name,
            password: password,
            gender: gender as Gender,
            phone_number: phone_number ?? "",
          },
        }),
      ]);
      await prisma.$transaction([
        prisma.userRole.create({
          data: { user_id: createdUser.id, role_id },
        }),
      ]);

      const user = await prisma.user.findUnique({
        where: { id: createdUser.id },
        include: {
          roles: {
            include: { role: true },
          },
        },
      });

      if (!user) throw "Create user failed";

      return new UserEntity(
        user.id,
        user.username,
        user.name!,
        user.email,
        user.password,
        user.gender! as any,
        user.phone_number ?? "",
        user.created_at,
        user.updated_at,
        user.roles.map((role) => role.role)
      );
    } catch (error) {
      throw "[UserRepositoryImpl] createUser error: " + error;
    }
  };
}

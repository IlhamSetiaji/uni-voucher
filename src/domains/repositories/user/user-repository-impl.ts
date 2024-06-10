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
          data: { user_id: createdUser.id, role_id: role_id },
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

  updateUser = async(
    role_id: string,
    user_id: string,
    username: string,
    email: string,
    name: string,
    password: string,
    gender?: string,
    phone_number?: string
  ) => {
    try {
      const findRoleById = await prisma.role.findUnique({
        where: {
          id: role_id
        }
      })

      if(!findRoleById){
        throw 'role not found'
      }

      const [updateUser] = await prisma.$transaction([
        prisma.user.update({
          where: {
            id: user_id
          },
          data: {
            username: username,
            email: email,
            name: name,
            password: password,
            gender: gender as Gender,
            phone_number: phone_number,
            roles: {
              connect: {
                user_id_role_id: {
                  user_id: user_id,
                  role_id: role_id
                }
              }
            }
          },
          include: {
            roles: {
              include: {
                role: true
              }
            }
          }
        })
      ])

      if(!updateUser){
        throw "update user failed";
      }

      return new UserEntity(
        updateUser.id,
        updateUser.username,
        updateUser.name!,
        updateUser.email,
        updateUser.password,
        updateUser.gender! as any,
        updateUser.phone_number ?? "",
        updateUser.created_at,
        updateUser.updated_at,
        updateUser.roles.map((role) => role.role)
      )
    } catch (error) {
      throw "[UserRepositoryImpl] updateUser error: " + error;
    }
  }

  findUserById = async(user_id: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: user_id
        },
        include: {
          roles: {
            include: {
              role: true
            }
          }
        }
      })

      if(!user){
        return null
      }

      return new UserEntity(
        user.id,
        user.username,
        user.name!,
        user.email,
        user.password,
        user.gender as any,
        user.phone_number!,
        user.created_at,
        user.updated_at,
        user.roles.map((role) => role.role)
      )
    } catch (error) {
      throw "[UserRepositoryImpl] findUserById error: " + error;
    }
  }

  destroyUserByUserId = async(user_id: string) => {
    const user = await prisma.user.findUnique({
      where: {
        id: user_id
      }
    })

    if(!user){
      return null
    }

    try {
      const [destroyedUser] = await prisma.$transaction([
        prisma.user.delete({
          where: {
            id: user_id
          },
          include: {
            roles: {
              include: {
                role: true
              }
            }
          }
        })
      ])
      
      if(!destroyedUser){
        throw 'destroy user failed'
      }
      
      return new UserEntity(
        destroyedUser.id,
        destroyedUser.username,
        destroyedUser.name!,
        destroyedUser.email,
        destroyedUser.password,
        destroyedUser.gender as any,
        destroyedUser.phone_number!,
        destroyedUser.created_at,
        destroyedUser.updated_at,
        destroyedUser.roles.map((role) => role.role)
      )
    } catch (error) {
      throw "[UserRepositoryImpl] destroyUserByUserId error: " + error;
    }
  }
}

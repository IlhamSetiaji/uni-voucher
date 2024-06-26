import type { Request, Response } from "express";
import type { ICreateRoleUseCase } from "../use-cases/role/create-role-use-case";
import responseFormatter from "../../utils/response-formatter";
import {
  CreateRoleRequest,
  type ICreateRoleRequest,
} from "../../interfaces/http/requests/role/create-role-request";
import { validate, ValidationError } from "class-validator";
import type { IRegisterUserUseCase } from "../use-cases/user/register-user-use-case";
import {
  RegisterUserRequest,
  type IRegisterUserRequest,
} from "../../interfaces/http/requests/user/register-user-request";
import { generateToken } from "../../utils/auth";
import type { ILoginUserUseCase } from "../use-cases/user/login-user-use-case";
import {type ILoginUserRequest, LoginUserRequest } from '../../interfaces/http/requests/user/login-user-request';
import { UpdateUserRequest, type IUpdateUserRequest } from "../../interfaces/http/requests/user/update-user-request";
import type { IUpdateUserCase } from "../use-cases/user/update-user-use-case";
import { ShowUserRequest, type IShowUserRequest } from "../../interfaces/http/requests/user/show-user-request";
import type { IShowUserUseCase } from "../use-cases/user/show-user-use-case";
import { password } from "bun";
import type { IDestroyUserUseCase } from "../use-cases/user/destroy-user-use-case";

export class UserController {
  constructor(
    private registerUserUseCase: IRegisterUserUseCase,
    private loginUserUseCase: ILoginUserUseCase,
    private updateUserUseCase: IUpdateUserCase,
    private showUserUseCase: IShowUserUseCase,
    private destroyUserUseCse: IDestroyUserUseCase
  ) {}

  handleRegisterUser = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      const payload: IRegisterUserRequest = new RegisterUserRequest();
      payload.name = request.body.name;
      payload.username = request.body.username;
      payload.email = request.body.email;
      payload.password = request.body.password;
      payload.role_id = request.body.role_id;
      payload.gender = request.body.gender;
      payload.phone_number = request.body.phone_number;
      const error = await validate(payload);
      if (error.length > 0) {
        const validationErrors = error.map((err: ValidationError) => {
          const { property, constraints } = err;
          const messages = Object.values(constraints || {});
          return { field: property, messages };
        });
        return responseFormatter.badRequest(response, validationErrors);
      }
      const user = await this.registerUserUseCase.execute(payload);
      const { password: _, ...userWithoutPassword } = user;
      const token = generateToken(user.id);
      const data = {
        ...userWithoutPassword,
        token,
      };
      return responseFormatter.success(
        response,
        data,
        "User created successfully"
      );
    } catch (error: any) {
      console.error(`[UserController handleRegisterUser] ${error}`);
      return responseFormatter.error(response, error);
    }
  };

  handleLoginUser = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      const payload: ILoginUserRequest = new LoginUserRequest();
      payload.email = request.body.email;
      payload.password = request.body.password;
      const error = await validate(payload);
      if (error.length > 0) {
        const validationErrors = error.map((err: ValidationError) => {
          const { property, constraints } = err;
          const messages = Object.values(constraints || {});
          return { field: property, messages };
        });
        return responseFormatter.badRequest(response, validationErrors);
      }
      const user = await this.loginUserUseCase.execute(payload);
      const { password: _, ...userWithoutPassword } = user;
      const token = generateToken(user.id);
      const data = {
        ...userWithoutPassword,
        token,
      };
      return responseFormatter.success(response, data, "User logged in");
    } catch (error: any) {
      console.error(`[UserController handleLoginUser] ${error}`);
      return responseFormatter.error(response, error);
    }
  };

  handleUpdateUser = async (request: Request, response: Response): Promise<Response> => {
    try {
      const payload: IUpdateUserRequest = new UpdateUserRequest()

      payload.user_id = request.params.userId;
      payload.name = request.body.name;
      payload.username = request.body.username;
      payload.email = request.body.email;
      payload.password = request.body.password;
      payload.role_id = request.body.role_id;
      payload.gender = request.body.gender;
      payload.phone_number = request.body.phone_number;

      const error = await validate(payload);
      if(error.length > 0){
        const validationErrors = error.map((err: ValidationError) => {
          const { property, constraints } = err;
          const messages = Object.values(constraints || {});
          return { field: property, messages };
        });
        return responseFormatter.badRequest(response, validationErrors);
      }
      const user = await this.updateUserUseCase.execute(payload)
      const {password:_, ...userWithoutPassword} = user
      const data = {
        ...userWithoutPassword
      }
      return responseFormatter.success(response, data, "test payload");
    } catch (error: any) {
      console.error(`[UserController handleUpdateUser] ${error}`)
      return responseFormatter.error(response, error);
    }
  }

  handleShowUser = async(request: Request, response: Response): Promise<Response> => {
    const user_id: string = request.params.userId
    
    try {
      const user = await this.showUserUseCase.execute(user_id)

      if(!user){
        return responseFormatter.notFound(response, 'not found', "not found");
      }

      const {password:_, ...userWithoutPassword} = user!
      const data = {
        ...userWithoutPassword
      }
      return responseFormatter.success(response, data, "success");
    } catch (error) {
      console.error(`[UserController handleShowUser] ${error}`)
      return responseFormatter.error(response, error);
    }
  }

  handleDestroyUser = async(request: Request, response: Response): Promise<Response> => {
    const user_id: string = request.params.userId

    try {
      const destroyUser = this.destroyUserUseCse.execute(user_id)
      return responseFormatter.success(response, destroyUser, "success");
    } catch (error) {
      console.error(`[UserController handleDestroyUser] ${error}`)
      return responseFormatter.error(response, error);
    }
  }
}

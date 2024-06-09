import type { Request, Response } from "express";
import type { ICreateRoleUseCase } from "../use-cases/role/create-role-use-case";
import responseFormatter from "../../utils/response-formatter";
import {
  CreateRoleRequest,
  type ICreateRoleRequest,
} from "../../interfaces/http/requests/role/create-role-request";
import { validate, ValidationError } from "class-validator";
import type { IGetAllRoleUseCase } from "../use-cases/role/get-all-role-use-case";
import { UpdateRoleRequest, type IUpdateRoleRequest } from "../../interfaces/http/requests/role/updare-role-request";
import type { IUpdateRoleUseCase } from "../use-cases/role/update-role-use-case";

export class RoleController {
  constructor(
    private createRoleUseCase: ICreateRoleUseCase,
    private getAllRoleUseCase: IGetAllRoleUseCase,
    private updateRoleUseCase: IUpdateRoleUseCase
  ) {}

  handleCreateRole = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      const payload: ICreateRoleRequest = new CreateRoleRequest();
      payload.name = request.body.name;
      payload.guard_name = request.body.guard_name;
      const error = await validate(payload);
      if (error.length > 0) {
        const validationErrors = error.map((err: ValidationError) => {
          const { property, constraints } = err;
          const messages = Object.values(constraints || {});
          return { field: property, messages };
        });
        return responseFormatter.badRequest(response, validationErrors);
      }
      const role = await this.createRoleUseCase.execute(payload);
      return responseFormatter.success(
        response,
        role,
        "Role created successfully"
      );
    } catch (error: any) {
      console.error(`[RoleController handleCreateRole] ${error}`);
      return responseFormatter.error(response, error);
    }
  };

  handleGetRole = async(request: Request, response: Response): Promise<Response> => {
    try {
      const search: string = request.query.search as string
      const role = await this.getAllRoleUseCase.execute(search)
      return responseFormatter.success(
        response,
        role,
        "get Role Success"
      );
    } catch (error) {
      console.error(`[RoleController handleGetRole] ${error}`);
      return responseFormatter.error(response, error);
    }
  }

  handleUpdateRole = async(request: Request, response: Response): Promise<Response> => {
    const payload: IUpdateRoleRequest = new UpdateRoleRequest()
    const role_id: string = request.params.role_id

    payload.name = request.body.name
    payload.guard_name = request.body.guard_name

    const error = await validate(payload)
    if (error.length > 0) {
      const validationErrors = error.map((err: ValidationError) => {
        const { property, constraints } = err;
        const messages = Object.values(constraints || {});
        return { field: property, messages };
      });
      return responseFormatter.badRequest(response, validationErrors);
    }
    
    try {
      const role = await this.updateRoleUseCase.execute(payload, role_id)
      return responseFormatter.success(
        response,
        role,
        "Role update successfully"
      );
    } catch (error) {
      console.error(`[RoleController handleUpdateRole] ${error}`);
      return responseFormatter.error(response, error);
    }
  }
}

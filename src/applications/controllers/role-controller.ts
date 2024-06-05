import type { Request, Response } from "express";
import type { ICreateRoleUseCase } from "../use-cases/role/create-role-use-case";
import responseFormatter from "../../utils/response-formatter";
import {
  CreateRoleRequest,
  type ICreateRoleRequest,
} from "../../interfaces/http/requests/role/create-role-request";
import { validate, ValidationError } from "class-validator";

export class RoleController {
  constructor(private createRoleUseCase: ICreateRoleUseCase) {}

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
}

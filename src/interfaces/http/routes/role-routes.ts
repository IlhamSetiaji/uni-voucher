import { Router, type Request, type Response } from "express";
import { RoleFactory } from "../../../factories/role-factory";

const roleRoutes = Router();
const roleContoller = RoleFactory.makeRoleController();

roleRoutes.post("/create", (req: Request, res: Response) =>
  roleContoller.handleCreateRole(req, res)
);

export { roleRoutes };

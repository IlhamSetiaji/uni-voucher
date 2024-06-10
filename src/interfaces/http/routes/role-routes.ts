import { Router, type Request, type Response } from "express";
import { RoleFactory } from "../../../factories/role-factory";
import { authMiddleware } from "../../../middlewares/auth-middleware";

const roleRoutes = Router();
const roleContoller = RoleFactory.makeRoleController();

roleRoutes.get("/", authMiddleware, (req: Request, res: Response) => 
  roleContoller.handleGetRole(req, res)
)
roleRoutes.put("/:role_id", authMiddleware, (req: Request, res: Response) =>
  roleContoller.handleUpdateRole(req, res)
)
roleRoutes.post("/create", authMiddleware, (req: Request, res: Response) =>
  roleContoller.handleCreateRole(req, res)
);

export { roleRoutes };

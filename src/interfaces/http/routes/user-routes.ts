import { Router, type Request, type Response } from "express";
import { UserFactory } from "../../../factories/user-factory";
import { authMiddleware } from "../../../middlewares/auth-middleware";

const userRoutes = Router();
const userContoller = UserFactory.makeUserController();

userRoutes.post("/register", (req: Request, res: Response) =>
  userContoller.handleRegisterUser(req, res)
);
userRoutes.post("/login", (req: Request, res: Response) =>
  userContoller.handleLoginUser(req, res)
);
userRoutes.get("/protected", authMiddleware, (req: Request, res: Response) => {
  res.json({ message: `Hello user ${(req as any).userId}` });
});

export { userRoutes };

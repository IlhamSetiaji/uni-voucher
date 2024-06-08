import { Router, type Request, type Response } from "express";
import { UserFactory } from "../../../factories/user-factory";
import { authMiddleware } from "../../../middlewares/auth-middleware";

const userRoutes = Router();
const userContoller = UserFactory.makeUserController();

userRoutes.get("/:userId", authMiddleware, (req: Request, res: Response) =>
  userContoller.handleShowUser(req, res)
)
userRoutes.put("/:userId", authMiddleware, (req: Request, res: Response) => 
  userContoller.handleUpdateUser(req, res)
)
userRoutes.delete("/:userId", authMiddleware, (req: Request, res: Response) =>
  userContoller.handleDestroyUser(req, res)
)
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

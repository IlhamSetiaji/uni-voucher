import type { Request, Response } from "express";
import express from "express";
import dotenv from "dotenv";
import { roleRoutes } from "./src/interfaces/http/routes/role-routes";
import { userRoutes } from "./src/interfaces/http/routes/user-routes";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/roles", roleRoutes);
app.use("/users", userRoutes);
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

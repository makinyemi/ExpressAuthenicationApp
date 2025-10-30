import express, { type Request, type Response } from "express";
import { login, logout, refresh, signup } from "../../controllers/userController.ts";
import { users } from "../../models/user.ts";
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.status(200).json({ users: users });
});

userRouter.post("/login", login);

userRouter.post("/signup", signup);

userRouter.post("/logout", logout);

userRouter.post("/refresh", refresh)

export default userRouter;

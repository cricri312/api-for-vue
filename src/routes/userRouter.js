import express from "express";
import login from "../controllers/user/login";
import register from "../controllers/user/register";

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/register", register);

export default userRouter;

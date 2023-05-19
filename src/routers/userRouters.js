

import { Router } from "express";
import shortToken from "../middlewares/token.js";
import { shortUsers } from "../controllers/user.js";

const userRouter = Router();

userRouter.get("/users/me", shortToken, shortUsers);

export default userRouter;
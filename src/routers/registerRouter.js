
import { Router } from "express";
import middlewareSchema from "../middlewares/middleware.js";
import shortToken from "../middlewares/token.js";
import shortSignUpSchema from "../schemas/registerSchema.js";
import shortSignInSchema from "../schemas/loginSchema.js";
import { shortSignUp , shortSignIn , shortUsers , shortRankings } from "../controllers/register.js";


const registerRouter = Router();

registerRouter.post("/signup", middlewareSchema(shortSignUpSchema), shortSignUp);
registerRouter.post("/signin", middlewareSchema(shortSignInSchema), shortSignIn);
registerRouter.get("/users/me", shortToken, shortUsers);
registerRouter.get("/ranking", shortRankings);

export default registerRouter;

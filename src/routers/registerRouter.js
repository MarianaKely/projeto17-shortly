
import { Router } from "express";
import middlewareSchema from "../middlewares/middleware.js";
import shortSignUpSchema from "../schemas/registerSchema.js";
import shortSignInSchema from "../schemas/loginSchema.js";
import { shortSignUp , shortSignIn } from "../controllers/register.js";


const registerRouter = Router();

registerRouter.post("/signup", middlewareSchema(shortSignUpSchema), shortSignUp);
registerRouter.post("/signin", middlewareSchema(shortSignInSchema), shortSignIn);


export default registerRouter;

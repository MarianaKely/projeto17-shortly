
import { Router } from "express";
import middlewareSchema from "../middlewares/middleware.js";
import { register } from "../controllers/register.js";
import { registerSchema } from "../schemas/registerSchema.js";


const registerRouters = Router();

registerRouters.post( "/signup" , middlewareSchema(registerSchema) , register);

export default registerRouters;
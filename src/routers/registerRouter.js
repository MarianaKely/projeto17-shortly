
import { Router } from "express";
import middleware from "../middlewares/middleware.js";
import { register } from "../controllers/register.js";
import { registerSchema } from "../schemas/registerSchema.js";


const registerRouters = Router();

registerRouters.post( "/signup" , middleware(registerSchema) , register);

export default registerRouters;
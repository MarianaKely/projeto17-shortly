
import { Router } from "express";
import middlewareSchema from "../middlewares/middleware.js";
import shortToken from "../middlewares/token.js";
import shortUrlSchema from "../schemas/urlSchema.js";
import { shortShorten , shortIdUrl , shortOpen , shortDelete } from "../controllers/urls.js";




const urlsRouter = Router();

urlsRouter.post("/urls/shorten", middlewareSchema(shortUrlSchema), shortToken, shortShorten);
urlsRouter.get("/urls/:id", shortIdUrl);
urlsRouter.get("/urls/open/:shortUrl", shortOpen);


export default urlsRouter;
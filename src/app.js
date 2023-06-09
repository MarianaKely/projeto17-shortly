
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import registerRouter from "./routers/registerRouter.js";
import urlsRouter from "./routers/urlRouters.js";
import userRouter from "./routers/userRouters.js";
import rankingRouter from "./routers/rankingRouter.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(registerRouter);
app.use(urlsRouter);
app.use(userRouter);
app.use(rankingRouter);


const PORT = process.env.PORT || 5000;

app.listen( PORT, console.log(`HI, IT'S ME!!!`));
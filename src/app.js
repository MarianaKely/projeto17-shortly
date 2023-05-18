
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import registerRouters from "./routers/registerRouter.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(registerRouters);


const PORT = process.env.PORT || 5000;

app.listen( PORT, console.log(`HI, IT'S ME!!!`));
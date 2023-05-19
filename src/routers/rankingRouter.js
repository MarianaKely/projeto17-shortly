

import { Router } from "express";
import { shortRankings } from "../controllers/ranking.js";

const rankingRouter = Router();

rankingRouter.get("/ranking", shortRankings);

export default rankingRouter;
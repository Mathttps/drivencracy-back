import { Router } from "express";
import { choicePoll, choicePollId } from "../controllers/choice.js";

const choiceRoutes = Router();

choiceRoutes.post("/choice", choicePoll);
choiceRoutes.post("/choice/:id/vote", choicePollId);

export default choiceRoutes;
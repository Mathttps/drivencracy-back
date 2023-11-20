import { Router } from "express";
import { collectPoll, createPoll, choiceIdPoll, resultIdPoll } from "../controllers/poll.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { pollSchema } from "../schemas/pollSchema.js";

const pollRoutes = Router();

pollRoutes.post('/poll',validateSchema(pollSchema), createPoll); 
pollRoutes.get('/poll', collectPoll);   
pollRoutes.get('/poll/:id/choice', choiceIdPoll); 
pollRoutes.get("/poll/:id/result", resultIdPoll); 

export default pollRoutes;
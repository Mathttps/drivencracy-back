import express from 'express';
import cors from 'cors';
import pollRouter from './routes/pollRouter.js';
import choiceRouter from './routes/choiceRouter.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use(pollRouter, choiceRouter);

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Servidor rodando porta ${port}`));

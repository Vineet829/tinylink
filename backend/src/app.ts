import express from 'express';
import cors from 'cors';
import linksRouter from './routes/links.routes';
import healthRouter from './routes/health.routes';
import redirectRouter from './routes/redirect.routes';
import { errorHandler } from './utils/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/links', linksRouter);
app.use('/healthz', healthRouter);
app.use('/', redirectRouter);

app.use(errorHandler);

export default app;

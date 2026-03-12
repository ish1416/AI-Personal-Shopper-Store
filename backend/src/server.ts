import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import database from './config/database';
import routes from './routes';
import { errorHandler, notFound } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001'], credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'AI Personal Shopper API' }));
app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

async function bootstrap() {
  await database.connect();
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}

bootstrap().catch((err) => { console.error('Failed to start server:', err); process.exit(1); });

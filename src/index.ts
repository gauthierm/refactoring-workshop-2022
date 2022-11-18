import dotenvFlow from 'dotenv-flow';
import express from 'express';
import { routes } from './routes';

dotenvFlow.config({
  default_node_env: 'development',
});

export const app = express();

app.use('/', routes);

const server = app.listen(process.env.PORT);

process.on('SIGINT', () => {
  server.close(() => process.exit(0));
});

process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});

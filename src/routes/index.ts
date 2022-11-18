import { Router } from 'express';
import { slow } from '../middleware/slow';
import { router as api } from './api';

export const routes = Router();

routes.use('/api', slow, api);

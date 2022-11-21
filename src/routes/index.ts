import { Router, Request, Response } from 'express';
import { slow } from '../middleware/slow';
import { router as api } from './api';
import { getPageContent } from '../html/getPageContent';

export const routes = Router();

routes.use('/api', slow, api);
routes.get('/', async (req: Request, res: Response) => {
  res.send(await getPageContent());
});

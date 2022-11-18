import { Router } from 'express';
import { router as orgs } from './orgs';
import { router as repos } from './repos';

export const router = Router();

router.use('/orgs', orgs);
router.use('/repos', repos);

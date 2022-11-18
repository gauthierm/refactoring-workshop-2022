import { Router } from 'express';
import { contributors } from './contributors';

export const router = Router();

router.use('/:org/:repo/contributors', contributors);

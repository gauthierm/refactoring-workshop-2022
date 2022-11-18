import { Router } from 'express';
import { members } from './members';

export const router = Router();

router.get('/:org/members', members);

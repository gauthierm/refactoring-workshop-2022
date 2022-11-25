import { NextFunction, Request, Response } from 'express';

const MIN_DELAY_MS = 20;
const MAX_DELAY_MS = 50;

export function slow(req: Request, res: Response, next: NextFunction) {
  const delay = MIN_DELAY_MS + Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS);

  setTimeout(() => {
    next();
  }, delay);
}

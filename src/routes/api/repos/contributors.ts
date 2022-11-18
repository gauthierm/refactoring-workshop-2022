import { Request, Response } from 'express';
import { promises } from 'fs';
import { dirname } from 'path';
import { port } from '../../../config';

const { readFile } = promises;

const dataDir = dirname(dirname(dirname(dirname(__dirname)))) + '/data';

const totalPages = 15;

export async function contributors(req: Request, res: Response) {
  const page = Number.parseInt((req.query?.page as string) ?? '1', 10);

  const filename = `${dataDir}/contributors-${page}.json`;

  const links: string[] = [];
  const base = `http://localhost:${port}/api/repos/${req.params.org}/${req.params.repo}/contributors`;

  if (page !== 1) {
    links.push(`<${base}?page=${page - 1}>; rel="prev"`);
    links.push(`<${base}?page=1>; rel="first"`);
  }

  if (page !== totalPages) {
    links.push(`<${base}?page=${page + 1}>; rel="next"`);
    links.push(`<${base}?page=${totalPages}>; rel="last"`);
  }

  res.header('link', links.join(', '));

  res.json(JSON.parse(await readFile(filename, { encoding: 'utf8' })));
}

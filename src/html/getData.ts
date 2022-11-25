import fetch from 'node-fetch';
import { getNextPage } from './getNextPage';

export async function getData(url: string): Promise<any[]> {
  const res = await fetch(url);

  let data = (await res.json()) as any[];

  let nextPageUrl = getNextPage(res.headers.get('link') ?? '');
  while (nextPageUrl !== '') {
    const res = await fetch(nextPageUrl);
    data = data.concat((await res.json()) as any[]);
    nextPageUrl = getNextPage(res.headers.get('link') ?? '');
  }

  return data;
}

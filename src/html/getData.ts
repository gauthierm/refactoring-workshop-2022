import fetch from 'node-fetch';
import { getNextPage } from './getNextPage';

export async function getData<T>(url: string): Promise<T[]> {
  const res = await fetch(url);

  let data = (await res.json()) as T[];

  let nextPageUrl = getNextPage(res.headers.get('link') ?? '');
  while (nextPageUrl !== '') {
    const res = await fetch(nextPageUrl);
    data = data.concat((await res.json()) as T[]);
    nextPageUrl = getNextPage(res.headers.get('link') ?? '');
  }

  return data;
}

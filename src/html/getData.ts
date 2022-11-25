import fetch from 'node-fetch';
import { z } from 'zod';
import { getNextPage } from './getNextPage';

export async function getData<T extends z.ZodTypeAny>(
  schema: T,
  url: string
): Promise<Array<z.infer<T>>> {
  const res = await fetch(url);

  let data = z.array(schema).parse(await res.json());

  let nextPageUrl = getNextPage(res.headers.get('link') ?? '');
  while (nextPageUrl !== '') {
    const res = await fetch(nextPageUrl);
    data = data.concat(z.array(schema).parse(await res.json()));
    nextPageUrl = getNextPage(res.headers.get('link') ?? '');
  }

  return data;
}

import fetch from 'node-fetch';
import { z } from 'zod';
import { getNextPage } from './getNextPage';

export async function getData<T extends z.ZodTypeAny>(
  schema: T,
  url: string
): Promise<Array<z.infer<T>>> {
  if (url !== '') {
    const res = await fetch(url);

    return [
      ...z.array(schema).parse(await res.json()),
      ...(await getData(schema, getNextPage(res.headers.get('link') ?? ''))),
    ];
  }

  return [];
}

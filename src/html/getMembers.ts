import fetch from 'node-fetch';
import { port } from '../config';
import { getNextPage } from './getNextPage';

export async function getMembers() {
  const members: string[] = [];
  const res = await fetch(`http://localhost:${port}/api/orgs/facebook/members`);
  const data = (await res.json()) as any[];
  data.forEach((contributor) => {
    if (contributor.type === 'User') {
      members.push(contributor.login);
    }
  });

  let nextPageUrl = getNextPage(res.headers.get('link') || '');
  while (nextPageUrl !== '') {
    const res = await fetch(nextPageUrl);
    const data = (await res.json()) as any[];
    data.forEach((contributor) => {
      if (contributor.type === 'User') {
        members.push(contributor.login);
      }
    });
    nextPageUrl = getNextPage(res.headers.get('link') || '');
  }
  return members;
}

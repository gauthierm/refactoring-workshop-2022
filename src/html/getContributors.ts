import fetch from 'node-fetch';
import { port } from '../config';
import { getNextPage } from './getNextPage';

export async function getContributors(): Promise<any[]> {
  const contributors: any[] = [];

  const res = await fetch(
    `http://localhost:${port}/api/repos/facebook/react/contributors`
  );

  const data = (await res.json()) as any[];
  data.forEach((contributor) => {
    if (contributor.type === 'User') {
      const majorContributor = contributor.contributions > 500 ? true : false;
      contributors.push({
        majorContributor,
        login: contributor.login,
        contributions: contributor.contributions,
      });
    }
  });

  let nextPageUrl = getNextPage(res.headers.get('link') || '');
  while (nextPageUrl !== '') {
    const res = await fetch(nextPageUrl);
    const data = (await res.json()) as any[];
    data.forEach((contributor) => {
      if (contributor.type === 'User') {
        contributors.push({
          login: contributor.login,
          contributions: contributor.contributions,
        });
      }
    });
    nextPageUrl = getNextPage(res.headers.get('link') || '');
  }

  return contributors;
}

import { port } from '../config';
import { getData } from './getData';

export async function getContributors(): Promise<any[]> {
  const contributors: any[] = [];

  const data: any[] = await getData(
    `http://localhost:${port}/api/repos/facebook/react/contributors`
  );

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

  return contributors;
}

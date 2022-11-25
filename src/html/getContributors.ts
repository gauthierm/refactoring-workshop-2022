export function getContributors(data: any[]): any[] {
  const contributors: any[] = [];

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

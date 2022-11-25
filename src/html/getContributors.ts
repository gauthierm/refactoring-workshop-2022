export function getContributors(data: any[]): any[] {
  return data
    .filter((contributor) => contributor.type === 'User')
    .map((contributor) => ({
      majorContributor: contributor.contributions > 500,
      login: contributor.login,
      contributions: contributor.contributions,
    }));
}

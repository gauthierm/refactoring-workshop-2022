import { isUser } from './isUser';

export function getContributors(data: any[]): any[] {
  return data.filter(isUser).map((contributor) => ({
    majorContributor: contributor.contributions > 500,
    login: contributor.login,
    contributions: contributor.contributions,
  }));
}

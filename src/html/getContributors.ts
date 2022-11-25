import { ApiContributor } from '../schema/contributor';
import { isUser } from './isUser';

export interface Contributor {
  login: string;
  contributions: number;
  majorContributor: boolean;
}

export function getContributors(data: ApiContributor[]): Contributor[] {
  return data.filter(isUser).map((contributor) => ({
    majorContributor: contributor.contributions > 500,
    login: contributor.login,
    contributions: contributor.contributions,
  }));
}

import { Contributor } from './getContributors';

export function getContributorsByOrganization(
  contributors: Contributor[],
  members: string[]
) {
  return contributors.reduce<{
    facebook: Contributor[];
    other: Contributor[];
  }>(
    ({ facebook, other }, contributor) => {
      return members.includes(contributor.login)
        ? { facebook: [...facebook, contributor], other }
        : { facebook, other: [...other, contributor] };
    },
    { facebook: [], other: [] }
  );
}

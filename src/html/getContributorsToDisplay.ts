import { Contributor } from './getContributors';

export function getContributorsToDisplay(groupedContributors: {
  [key: string]: Contributor[];
}) {
  return Object.fromEntries(
    Object.entries(groupedContributors).map(([key, contributors]) => {
      const displayContributors = contributors.slice();
      displayContributors.sort((a, b) => b.contributions - a.contributions);
      displayContributors.splice(10);
      displayContributors.sort((a, b) => a.login.localeCompare(b.login));
      return [key, displayContributors];
    })
  );
}

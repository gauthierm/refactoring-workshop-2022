export function getContributorsToDisplay(groupedContributors: {
  [key: string]: any[];
}) {
  groupedContributors.facebook.sort(
    (a, b) => b.contributions - a.contributions
  );
  groupedContributors.other.sort((a, b) => b.contributions - a.contributions);

  groupedContributors.facebook.splice(10);
  groupedContributors.other.splice(10);

  groupedContributors.facebook.sort((a, b) => a.login.localeCompare(b.login));
  groupedContributors.other.sort((a, b) => a.login.localeCompare(b.login));

  return groupedContributors;
}

export function getTotalContributionsByOrganization(groupedContributors: {
  [key: string]: any[];
}) {
  return Object.fromEntries(
    Object.entries(groupedContributors).map(([group, contributors]) => {
      return [
        group,
        contributors.reduce(
          (total: number, contributor: any) =>
            total + contributor.contributions,
          0
        ),
      ];
    })
  );
}

export function getContributorsByOrganization(
  contributors: any[],
  members: any[]
) {
  return contributors.reduce<{
    facebook: any[];
    other: any[];
  }>(
    ({ facebook, other }, contributor) => {
      return members.includes(contributor.login)
        ? { facebook: [...facebook, contributor], other }
        : { facebook, other: [...other, contributor] };
    },
    { facebook: [], other: [] }
  );
}
